import mongoose from "npm:mongoose";
import { Comic } from "../types.ts";
import setDocumentId from "../lib/setDocumentId.ts";
import { ColeccionModel } from "./coleccion.ts";

const comicSchema = new mongoose.Schema<Comic>({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: false },
  formato: { type: String, required: true },
});

comicSchema.set("toJSON", {
  transform: setDocumentId,
});

comicSchema.pre("findOneAndDelete", async function (next) {
  const id = this.get("_id");
  await ColeccionModel.updateMany({ comics: id }, { $pull: { comics: id } });
  next();
});

export const ComicModel = mongoose.model("Comic", comicSchema);
