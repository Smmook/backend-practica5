import mongoose from "npm:mongoose";
import { ColeccionComicsType } from "../types.ts";
import setDocumentId from "../lib/setDocumentId.ts";
import { ComicModel } from "./comic.ts";

const coleccionSchema = new mongoose.Schema<ColeccionComicsType>({
  nombre: { type: String, required: true },
  comics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comic" }],
});

coleccionSchema.set("toJSON", { transform: setDocumentId });

coleccionSchema.path("comics").validate(
  async function (comicsIds: mongoose.Types.ObjectId[]) {
    try {
      if (comicsIds.some((id) => !mongoose.isValidObjectId(id))) return false;

      const comics = await ComicModel.find({ _id: { $in: comicsIds } });
      return comics.length === comicsIds.length;
    } catch (_e) {
      return false;
    }
  },
);

export const ColeccionModel = mongoose.model(
  "ColeccionComics",
  coleccionSchema,
);
