import { Injectable, inject } from '@angular/core';
import { Observable, from, map, switchMap } from 'rxjs';
import { SparqlResult } from './model/sparql-result-json';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { rdfEnvironment } from '../../rdf/rdf-environment'
import { Dataset } from '@zazuko/env/lib/DatasetExt';
import toStream from 'string-to-stream';

const RDF_MIME_TYPE = 'application/n-triples';

@Injectable({
  providedIn: 'root'
})
export class SparqlService {
  private readonly http = inject(HttpClient);

  constructor() { }



  /**
   * Execute a SPARQL SELECT query
   * 
   * @param query The SPARQL SELECT query
   * @returns an observable of the resulting bindings 
   */
  select(endpointUrl: string, query: string): Observable<SparqlResult> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/sparql-results+json'
    });

    const body = new URLSearchParams();
    body.set('query', query);

    const options = {
      headers
    };

    return this.http.post<SparqlResult>(endpointUrl, body.toString(), options);
  }

  construct(endpointUrl: string, query: string): Observable<Dataset> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': RDF_MIME_TYPE
    });

    const body = new URLSearchParams();
    body.set('query', query);


    const options = {
      headers,
      responseType: 'text' as const
    };


    return this.http.post(endpointUrl, body.toString(), options).pipe(
      switchMap(data => {
        const stream = toStream(data);
        const quadStream = rdfEnvironment.formats.parsers.import(RDF_MIME_TYPE, stream)
        if (!quadStream) {
          throw new Error('Failed to parse response');
        }
        return from(rdfEnvironment.dataset().import(quadStream));
      }
      )
    );
  }
}
