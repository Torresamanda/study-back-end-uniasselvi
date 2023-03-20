import { Json } from "../models/json-model";
import { Movie } from "../models/movies-model";

const MovieService = require('../services/MovieService');

module.exports = {
    getAll: async (req:any, res:any) => {
        let json: Json = { error: '', result: [] };

        let movies = await MovieService.getAll();

        for (let i in movies) {
            json.result.push({
                id: movies[i].id,
                name: movies[i].name,
                type: movies[i].type
            })
        }
        res.json(json);
    },

    getMovie: async (req:any, res:any) => {
        let json = { error: '', result: {} };

        let internalId = req.params.internalId;
        let movie = await MovieService.getMovie(internalId);

        if (movie) {
            try {
                json.result = movie;
                res.json(json);
            } catch {
                json.error = 'Erro no servidor ao pegar o filme';
                res.status(503).json(json);
            }
        } else {
            json.error = 'ID invalido ou inexistente.';
            return res.status(404).json(json);
        }
    },

    setMovie: async (req:any, res: any) => {
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
                res.status(201).json(json);
            } catch (error){
                json.error = 'Erro ao adicionar o filme.';
                res.status(500).json(json);
            } 
        } else {
            json.error = `Campos não enviados. ${movie.id}, ${movie.name}, ${movie.type}`;
            res.status(404).json(json);
        }
            // let movieId = await MovieService.setMovie(id, name, type);
            // json.result = {
            //     internalId: movieId.result.insertId,
            //     id,
            //     name,
            //     type
            // }
        // } else {
        //     json.error = 'Campo não enviados';
        // }

        // res.json(json);
    },
    // THIS IS WORKING
    // deleteMovie: async (req: any, res: any) => {
    //     let json = { error: '', result: {} };
    //     console.log('test');
    //     const result = await MovieService.deleteMovie(req.params.id);

    //     res.json(result);
    // }

    deleteMovie: async (req: any, res: any) => {
        let json = { error: '', result: {} };
        const result = await MovieService.deleteMovie(req.params.internalId);
        // console.log(result);
        if(result.affectedRows > 0){        
            try {
                res.status(204).json(json);
            } catch {
                json.error = `Erro ao deletar o filme`;
                res.status(500).json(json);
            }
        } else {
            json.error = 'É necessario informar um id do filme a ser deletado';
            res.status(404).json(json);
        }
    }
}