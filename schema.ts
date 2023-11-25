export const typeDefs = `#graphql
  type Usuario {
    id: ID!
    nombre: String!
    correoElectronico: String!
    coleccionComics: ColeccionComics
  }

  type Comic {
    id: ID!
    titulo: String!
    descripcion: String
    formato: String!
  }

  type ColeccionComics {
    id: ID!
    nombre: String!
    comics: [Comic]!
  }

  type Query {
    test: String
    comics: [Comic]
  }

  type Mutation {
    addUsuario(nombre: String!, correoElectronico: String!, coleccionComics: ID!): Usuario
    addComic(titulo: String!, descripcion: String, formato: String!): Comic
  }
`;
