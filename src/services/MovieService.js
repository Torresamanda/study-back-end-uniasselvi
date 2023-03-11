const db = require('../db')

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM Movies', (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                aceito(results);
            });
        });
    },

    buscarUm: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM Movies WHERE id = ?', [id], (error, results) => {
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

    inserir: (name, midiaType) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO Movies (name, MidiaType) VALUES (?, ?)',
                [name, midiaType],
                (error, results) => {
                    if (error) {
                        rejeitado(error)
                    };

                    aceito(results.movieId);
                });
        });
    },

    alterar: (id, name, midiaType) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE Movies SET name = ?, MidiaType = ? WHERE id = ?', 
            [name, midiaType, id],
            (error, results) => {
                if(error) {
                    rejeitado(error);
                    return;
                }
                aceito(results)
            })
        })
    },

    excluir: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM Movies WHERE id = ?', [id], (error, results) => {
                if(error) {
                    rejeitado(error);
                    return
                }
                aceito(results)
            })
        })
    }
};