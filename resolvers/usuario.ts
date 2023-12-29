import { ColeccionModel } from "../db/coleccion.ts";
import { UsuarioType } from "../types.ts";

export const Usuario = {
  coleccionComics: async (
    parent: UsuarioType & { coleccionComics: string },
  ) => {
    const coleccion = await ColeccionModel.findById(parent.coleccionComics);
    return coleccion;
  },
};
