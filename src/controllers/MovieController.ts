import { Json } from "../models/json-model";
import { Movie } from "../models/movies-model";

const MovieService = require('../services/MovieService');

module.exports = {
    getAll: async (req:any, res:any) => {
        let json: Json = { error: '', result: [] };

        let movies = await MovieService.getAll();
        // if(json.error){
        //     return json.error = res.status(404).send();
        // }
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

        let internalId = req.params.id;
        let movie = await MovieService.getMovie(internalId);

        if (movie) {
            json.result = movie;
        }

        res.json(json);
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
                const result = await MovieService.setMovie(movie);

                const movie2: Movie = {
                    internalId: result.insertId,
                    id: movie.id,
                    name: movie.name,
                    type: movie.type
                };

                json.result = movie2;
                res.status(201).json(json);
            } catch (error){
                console.error(error);
                json.error = 'Erro ao adicionar o filme.';
                res.status(500).json(json);
            } 
        } else {
            json.error = 'Campos não enviados';
            res.status(404).json(json)
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

    deleteMovie: async (req: any, res: any) => {
        let json = { error: '', result: {} };

        await MovieService.deleteMovie(req.params.id);

        res.json(json);
    }
}