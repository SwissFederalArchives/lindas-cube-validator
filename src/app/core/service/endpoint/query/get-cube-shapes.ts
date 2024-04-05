
export function getShapeGraphForCube(cubeIri: string) {
  return `
    #pragma describe.strategy cbd

    PREFIX cube: <https://cube.link/>

    DESCRIBE ?s
    WHERE {
      <${cubeIri}> cube:observationConstraint ?s .
    }`;
}

export function getDataGraphForCube(cubeIri: string) {
  return `
  PREFIX cube: <https://cube.link/>

  CONSTRUCT { ?s ?p ?o }
  WHERE {
    <${cubeIri}> cube:observationSet/cube:observation ?s .
    ?s ?p ?o
  }`;

}