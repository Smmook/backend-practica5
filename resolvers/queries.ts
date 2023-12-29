import { ComicModel } from "../db/comic.ts";
import { GraphQLError } from "npm:graphql";
import { UsuarioModel } from "../db/usuario.ts";

export const Query = {
  test: () => "Hello World!",

  comic: async (_: unknown, args: { id: string }) => {
    try {
      const comic = await ComicModel.findById(args.id);
      if (!comic) {
        throw new GraphQLError("No comic found with id " + args.id);
      }
      return comic;
    } catch (e) {
      throw new GraphQLError(e.message);
    }
  },

  comics: async () => {
    try {
      const comics = await ComicModel.find({});
      return comics;
    } catch (e) {
      throw new GraphQLError(e.message);
    }
  },

  usuarios: async () => {
    try {
      const users = await UsuarioModel.find({});
      return users;
    } catch (e) {
      throw new GraphQLError(e.message);
    }
  },

  usuario: async (_: unknown, args: { id: string }) => {
    try {
      const user = await UsuarioModel.findById(args.id);
      if (!user) {
        throw new GraphQLError("No user found with id " + args.id);
      }
      return user;
    } catch (e) {
      throw new GraphQLError(e.message);
    }
  },
};
