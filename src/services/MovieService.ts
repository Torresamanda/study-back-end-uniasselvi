import { Movie } from "../models/movies-model";

const db = require('../db')

module.exports = {
    getAll: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM Movies', (error:any, results:any) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                aceito(results);
            });
        });
    },

    getMovie: (internalId:number) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM movies WHERE internalId = (?)', [internalId], (error:any, results:any) => {
                if (error) {
                    rejeitado(error)
                }

                if (results.length > 0) {
                    aceito(results[0])
                } else {
                    aceito(false)
                }
            })
        })
    },

    setMovie: (movie:Movie) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO movies (id, name, type) VALUES (?, ?, ?)',
                [
                    movie.id, 
                    movie.name, 
                    movie.type
                ],
                (error:any, results:any) => {
                    if (error) {
                        rejeitado(error);
                        console.error(error);
                    };

                    aceito(results.movie);
                });
        });
    },
    

    deleteMovie: (internalId:number) => {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM movies WHERE internalId = ?', [internalId], (error:any, results:any) => {
                if(error) {
                    rejeitado(error);
                    return
                }
                aceito(results);
            })
        })
    }
};