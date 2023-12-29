import mongoose from "npm:mongoose";
import { UsuarioType } from "../types.ts";
import { ColeccionModel } from "./coleccion.ts";

const UserSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correoElectronico: { type: String, required: true },
  coleccionComics: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ColeccionComics",
  },
});

UserSchema.path("coleccionComics").validate(
  async function (coleccionComics: mongoose.Types.ObjectId) {
    try {
      if (!mongoose.isValidObjectId(coleccionComics)) return false;
      const coleccion = await ColeccionModel.findById(coleccionComics);
      if (!coleccion) return false;
      return true;
    } catch (_e) {
      return false;
    }
  },
);

UserSchema.post("findOneAndDelete", async function (doc) {
  await ColeccionModel.findByIdAndDelete(doc.coleccionComics);
});

export type UserModelType = mongoose.Document & Omit<UsuarioType, "id">;

export const UsuarioModel = mongoose.model<UserModelType>(
  "Usuario",
  UserSchema,
);
