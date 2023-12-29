import { ComicModel } from "../db/comic.ts";
import { ColeccionComicsType } from "../types.ts";

export const ColeccionComics = {
  comics: async (parent: ColeccionComicsType & { comics: string[] }) => {
    if (parent.comics.length === 0) return parent.comics;

    const comicArray = await Promise.all(
      parent.comics.map(async (id: string) => await ComicModel.findById(id)),
    );

    return comicArray;
  },
};
