const db = require('../db')

module.exports = {
    fetchAll: () => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT * FROM Vagas', (error, results) => {
                if (error) {
                    rejected(error);
                    return;
                }
                accepted(results);
            });
        });
    },

    buscarOne: (id) => {
        return new Promise((accepted, rejected) => {
            db.query('SELECT * FROM Vagas WHERE id = ?', [id], (error, results) => {
                if (error) {
                    rejected(error)
                }

                if (results.length > 0) {
                    accepted(results[0])
                } else {
                    accepted(false)
                }
            })
        })
    },

    insert: (name, midiaType) => {
        return new Promise((accepted, rejected) => {
            db.query('INSERT INTO Vagas (name, linguagens, regiao, tipo, descricao, salario) VALUES (?, ?, ?, ?, ?, ?)',
                [name, midiaType],
                (error, results) => {
                    if (error) {
                        rejected(error)
                    };

                    accepted(results.jobsId);
                });
        });
    },

};