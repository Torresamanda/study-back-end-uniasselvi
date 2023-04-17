export interface Movie {
    internalId?:number,
    id: number,
    name: string,
    type: string, //genero
    release_date?: string, // Consulta data
    poster_path?: string; //consulta url image
}