import { Movie } from "../models/movies-model";

const db = require('../db')

module.exports = {
    getAll: () => {
        return new Promise((accepted, rejeitado) => {
            db.query('SELECT * FROM Movies', (error:any, results:any) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                accepted(results);
            });
        });
    },

    getMovie: (internalId:number) => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT * FROM movies WHERE internalId = (?)', [internalId], (error:any, results:any) => {
                if (error) {
                    rejected(error);
                }

                if (results.length) {
                    accepted(results[0]);
                } 
                else {
                    accepted(false);
                }
            })
        })
    },

    setMovie: (movie:Movie) => {
        return new Promise((accepted, rejected) => {

            db.query('INSERT INTO movies (id, name, type) VALUES (?, ?, ?)',
                [
                    movie.id, 
                    movie.name, 
                    movie.type
                ],
                (error:any, results:any) => {
                    if (error) {
                        rejected(error);
                    };

                    accepted(results.movie);
                });
        });
    },

    deleteMovie: (internalId:number) => {
        return new Promise((accepted, rejected) => {
            db.query('DELETE FROM movies WHERE internalId = ?', [internalId], (error:any, results:any) => {
                if(error) {
                    rejected(error);
                    return
                }
                accepted(results);
            })
        })
    }
};