import { ApolloServer } from "npm:@apollo/server";
import { startStandaloneServer } from "npm:@apollo/server/standalone";
import mongoose from "npm:mongoose";
import { Query } from "./resolvers/queries.ts";
import { Mutation } from "./resolvers/mutations.ts";
import { typeDefs } from "./schema.ts";

const mongo_uri = Deno.env.get("MONGO");
if (!mongo_uri) {
  Deno.exit();
}

await mongoose.connect(mongo_uri);
console.log("Connected to mongo");

const resolvers = { Query, Mutation };

const server = new ApolloServer({ resolvers, typeDefs });

const { url } = await startStandaloneServer(server, {
  listen: {port: 8080}
});
console.log(`${url}`);
