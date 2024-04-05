export const GET_CUBE_ITEMS = `
PREFIX cube: <https://cube.link/>
PREFIX schema: <http://schema.org/>
   
SELECT * WHERE {
	?cube a cube:Cube 
    OPTIONAL { ?cube schema:name ?name . FILTER (langMatches(lang(?name), "")) }
    OPTIONAL { ?cube schema:name ?nameEN . FILTER (lang(?nameEN) = 'en') }
    OPTIONAL { ?cube schema:name ?nameDE . FILTER (lang(?nameDE) = 'de') }
    OPTIONAL { ?cube schema:name ?nameFR . FILTER (lang(?nameFR) = 'fr') }
    OPTIONAL { ?cube schema:name ?nameIT . FILTER (lang(?nameIT) = 'it') }
    OPTIONAL { ?cube schema:description ?description . FILTER (langMatches(lang(?description), "")) }
    OPTIONAL { ?cube schema:description ?descriptionEN . FILTER (lang(?descriptionEN) = 'en') }
    OPTIONAL { ?cube schema:description ?descriptionDE . FILTER (lang(?descriptionDE) = 'de') }
    OPTIONAL { ?cube schema:description ?descriptionFR . FILTER (lang(?descriptionFR) = 'fr') }
    OPTIONAL { ?cube schema:description ?descriptionIT . FILTER (lang(?descriptionIT) = 'it') }
    OPTIONAL { ?cube schema:datePublished ?datePublished }

}
`;

export const CONSTRUCT_CUBE_ITEMS = `
PREFIX cube: <https://cube.link/>
PREFIX schema: <http://schema.org/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

construct {
    ?cube ?p ?o .
} where {
    {
        SELECT ?cube WHERE {
            ?cube a cube:Cube .
        }
    }
    VALUES ?p { 
        rdf:type
        schema:name 
        schema:description 
        schema:datePublished
    }
    ?cube ?p ?o .
}
`;