import { ComicModel } from "../db/comic.ts";
import { GraphQLError } from "npm:graphql";

export const Query = {
  test: () => "Hello World!",

  comic: async (_: any, args: { id: string }) => {
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
};
