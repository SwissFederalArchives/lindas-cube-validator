import { Injectable, inject } from '@angular/core';
import { SparqlService } from '../sparql/sparql.service';
import { Observable, forkJoin, map } from 'rxjs';

// queries
import { CONSTRUCT_CUBE_ITEMS } from './query/get-cube-items';
import { MultiLanguageCubeItem } from './model/cube-item';
import { rdfEnvironment } from '../../rdf/rdf-environment';
import { cube } from '../../rdf/namespace';
import { getDataGraphForCube, getShapeGraphForCube } from './query/get-cube-shapes';
import { Dataset } from '@zazuko/env/lib/DatasetExt';
import Validator from 'rdf-validate-shacl';
import ValidationReport from 'rdf-validate-shacl/src/validation-report';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  private readonly sparqlService = inject(SparqlService);
  constructor() { }

  isOnline(endpointUrl: string): Observable<boolean> {
    return this.sparqlService.select(endpointUrl, 'SELECT * WHERE { ?s ?p ?o } LIMIT 1').pipe(
      map(result => result.results.bindings.length > 0),
    );
  }

  getCubes(endpointUrl: string): Observable<MultiLanguageCubeItem[]> {
    return this.sparqlService.construct(endpointUrl, CONSTRUCT_CUBE_ITEMS).pipe(
      map(cubeItemDataset => {
        const cubeItems = rdfEnvironment.clownface({ dataset: cubeItemDataset }).node(cube['Cube']).in().map(node => new MultiLanguageCubeItem(node));
        return cubeItems;

      }),
    );
  }

  getValidationReport(endpointUrl: string, cubeIri: string): Observable<ValidationReport> {
    const shapeGraphQuery = this.sparqlService.construct(endpointUrl, getShapeGraphForCube(cubeIri));
    const dataGraphQuery = this.sparqlService.construct(endpointUrl, getDataGraphForCube(cubeIri));

    return forkJoin([shapeGraphQuery, dataGraphQuery]).pipe(
      map(([shapeGraph, dataGraph]) => {
        const validator = new Validator(shapeGraph, { factory: rdfEnvironment });
        const report = validator.validate(dataGraph);
        return report
      }
      )
    );
  }
}


