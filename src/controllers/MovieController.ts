import { Request, Response } from 'express';
import { Json } from "../models/json-model";
import { Movie } from "../models/movies-model";
import MovieService from '../services/MovieService';


const jsonResponse = (res: Response, json: Json, status: number) => {
    res.status(status).json(json);
};


    export const getAll = async (req: Request, res: Response) => {
        let json: Json = { error: '', result: [] };

        let movies = await MovieService.getAll();

        for (let i in movies) {
            json.result.push({
                id: movies[i].id,
                name: movies[i].name,
                type: movies[i].type
            })
        }
        jsonResponse(res, json, 200);
    };

   export const getMovie = async (req: Request, res: Response) => {
        let json: Json = { error: '', result: {} };
      
        let internalId = parseInt(req.params.internalId, 10);
        let movie = await MovieService.getMovie(internalId);
      
        if (movie) {
          try {
            json.result = movie;
            jsonResponse(res, json, 200);
          } catch {
            json.error = 'Erro no servidor ao pegar o filme';
            jsonResponse(res, json, 503);
          }
        } else {
          json.error = 'ID invalido ou inexistente.';
          jsonResponse(res, json, 404);
        }
      };
      

    export const setMovie = async (req: Request, res: Response) => {
        let json = { error: '', result: {} };

        const { id, type, name } = req.body;
        let movie: Movie = {
            id: id,
            name: name,
            type: type
        };

        if (movie.id && movie.name && movie.type) {
            try {
                await MovieService.setMovie(movie);
                const movie2: Movie = {
                    id: movie.id,
                    name: movie.name,
                    type: movie.type
                };

                json.result = movie2;
                jsonResponse(res, json, 201);
            } catch (error) {
                json.error = 'Erro ao adicionar o filme.';
                jsonResponse(res, json, 500);
            }
        } else {
            json.error = `Campos não enviados. ${movie.id}, ${movie.name}, ${movie.type}`;
            jsonResponse(res, json, 404);
        }
    };

    export const deleteMovie = async (req: Request, res: Response) => {
        let json = { error: '', result: {} };
        const internalId = parseInt(req.params.internalId);
        const result = await MovieService.deleteMovie(internalId); // Alterado para usar internalId
    
        if (result.affectedRows > 0) {
            jsonResponse(res, json, 204);
        } else {
            json.error = 'É necessário informar um id do filme a ser deletado';
            jsonResponse(res, json, 404);
        }
};
  


