import { ComicModel } from "../db/comic.ts";
import { UsuarioModel } from "../db/usuario.ts";
import { GraphQLError } from "npm:graphql";

export const Mutation = {
  addUsuario: async (
    _: unknown,
    args: {
      nombre: string;
      correoElectronico: string;
      coleccionComics: string;
    },
  ) => {
    try {
      const { nombre, correoElectronico, coleccionComics } = args;
      const user = await new UsuarioModel({
        nombre,
        correoElectronico,
        coleccionComics,
      }).save();
      return user;
    } catch (e) {
      throw new GraphQLError(e.message);
    }
  },

  addComic: async (
    _: any,
    args: { titulo: string; descripcion?: string; formato: string },
  ) => {
    try {
      const { titulo, descripcion, formato } = args;
      const comic = await new ComicModel({ titulo, descripcion, formato })
        .save();
      return comic;
    } catch (e) {
      throw new GraphQLError(e.message);
    }
  },
};
