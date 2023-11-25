export type Usuario = {
  id: string;
  nombre: string;
  correoElectronico: string;
  coleccionComics: ColeccionComics;
};

export type Comic = {
  id: string;
  titulo: string;
  descripcion: string;
  formato: string;
};

export type ColeccionComics = {
  id: string;
  nombre: string;
  comics: Comic[];
};
