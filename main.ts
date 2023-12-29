import { ApolloServer } from "npm:@apollo/server";
import { startStandaloneServer } from "npm:@apollo/server/standalone";
import mongoose from "npm:mongoose";
import { Query } from "./resolvers/queries.ts";
import { Mutation } from "./resolvers/mutations.ts";
import { typeDefs } from "./schema.ts";
import { Usuario } from "./resolvers/usuario.ts";
import { ColeccionComics } from "./resolvers/coleccion.ts";

const mongo_uri = Deno.env.get("MONGO");
if (!mongo_uri) {
  Deno.exit();
}

await mongoose.connect(mongo_uri);
console.log("Connected to mongo");

const resolvers = { Query, Mutation, Usuario, ColeccionComics };

const server = new ApolloServer({ resolvers, typeDefs });

const { url } = await startStandaloneServer(server, {
  listen: { port: 8080 },
});
console.log(`${url}`);
