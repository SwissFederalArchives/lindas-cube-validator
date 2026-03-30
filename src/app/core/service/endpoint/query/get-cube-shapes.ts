
export function getShapeGraphForCube(cubeIri: string) {
  return `
    PREFIX cube: <https://cube.link/>

    DESCRIBE ?s ?cube
 	  FROM <http://www.ontotext.com/describe/outgoing>
    WHERE {
		  BIND(<${cubeIri}> AS ?cube)
      OPTIONAL {
      ?cube cube:observationConstraint ?s .
      }
    }`;
}
