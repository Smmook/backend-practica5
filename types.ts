export type UsuarioType = {
  id: string;
  nombre: string;
  correoElectronico: string;
  coleccionComics: ColeccionComicsType;
};

export type ComicType = {
  id: string;
  titulo: string;
  descripcion: string;
  formato: string;
};

export type ColeccionComicsType = {
  id: string;
  nombre: string;
  comics: ComicType[];
};
