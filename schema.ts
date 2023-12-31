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
    usuarios: [Usuario]!
    usuario(id: ID!): Usuario!
    comics: [Comic]!
    comic(id: ID!): Comic!
  }

  type Mutation {
    addUsuario(nombre: String!, correoElectronico: String!, nombreColeccion: String!, comics: [String]): Usuario
    updateUsuario(id: ID!, nombre: String!, correoElectronico: String!, nombreColeccion: String!, comics: [String]!): Usuario
    deleteUsuario(id: ID!): Usuario
    addComic(titulo: String!, descripcion: String, formato: String!): Comic
    updateComic(id: ID!, titulo: String!, descripcion: String, formato: String!): Comic
    deleteComic(id: ID!): Comic
  }
`;
