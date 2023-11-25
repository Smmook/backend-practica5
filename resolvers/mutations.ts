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

  updateComic: async (
    _: any,
    args: { id: string; titulo: string; descripcion?: string; formato: string },
  ) => {
    try {
      const { id, titulo, descripcion, formato } = args;
      const updated = await ComicModel.findByIdAndUpdate(id, {
        titulo,
        descripcion,
        formato,
      }, { new: true, runValidators: true });
      if (!updated) {
        throw new GraphQLError(`No se ha encontrado comic con id ${id}.`);
      }
      return updated;
    } catch (e) {
      throw new GraphQLError(e.message);
    }
  },

  deleteComic: async (_: any, args: { id: string }) => {
    try {
      const deleted = await ComicModel.findByIdAndDelete(args.id);
      if (!deleted) {
        throw new GraphQLError(`No se ha encontrado comic con id ${args.id}`);
      }
      return deleted;
    } catch (e) {
      throw new GraphQLError(e.message);
    }
  },
};
