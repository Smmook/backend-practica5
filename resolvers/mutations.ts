import { ColeccionModel } from "../db/coleccion.ts";
import { ComicModel } from "../db/comic.ts";
import { UsuarioModel } from "../db/usuario.ts";
import { GraphQLError } from "npm:graphql";

export const Mutation = {
  addUsuario: async (
    _: unknown,
    args: {
      nombre: string;
      correoElectronico: string;
      nombreColeccion: string;
      comics?: string[];
    },
  ) => {
    try {
      const { nombre, correoElectronico, nombreColeccion } = args;

      const comics = args.comics === undefined ? [] : args.comics;

      const coleccionComics = await new ColeccionModel({
        nombre: nombreColeccion,
        comics,
      }).save();

      const usuario = await new UsuarioModel({
        nombre,
        correoElectronico,
        coleccionComics,
      }).save();
      return usuario;
    } catch (e) {
      throw new GraphQLError(e.message);
    }
  },

  updateUsuario: async (_: unknown, args: {
    id: string;
    nombre: string;
    correoElectronico: string;
    nombreColeccion: string;
    comics: string[];
  }) => {
    try {
      const userOld = await UsuarioModel.findById(args.id);
      if (!userOld) {
        throw { message: `No se ha encontrado a un usuario con id ${args.id}` };
      }
      const { nombre, correoElectronico, nombreColeccion, comics } = args;
      await ColeccionModel.findByIdAndUpdate(userOld.coleccionComics, {
        nombre: nombreColeccion,
        comics,
      }, { runValidators: true });
      const updated = await UsuarioModel.findByIdAndUpdate(args.id, {
        nombre,
        correoElectronico,
      }, {
        new: true,
        runValidators: true,
      });
      console.log(updated);
      return updated;
    } catch (e) {
      throw new GraphQLError(e.message);
    }
  },

  deleteUsuario: async (_: unknown, args: { id: string }) => {
    try {
      const deleted = await UsuarioModel.findByIdAndDelete(args.id);
      if (!deleted) {
        throw { message: `No se ha encontrado usuario con id ${args.id}` };
      }
      return deleted;
    } catch (e) {
      throw new GraphQLError(e.message);
    }
  },

  addComic: async (
    _: unknown,
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
    _: unknown,
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

  deleteComic: async (_: unknown, args: { id: string }) => {
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
