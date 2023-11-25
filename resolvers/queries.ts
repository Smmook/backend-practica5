import { ComicModel } from "../db/comic.ts";
import { GraphQLError } from "npm:graphql";

export const Query = {
  test: () => "Hello World!",

  comics: async () => {
    try {
      const comics = await ComicModel.find({});
      return comics;
    } catch (e) {
      throw new GraphQLError(e.message);
    }
  },
};
