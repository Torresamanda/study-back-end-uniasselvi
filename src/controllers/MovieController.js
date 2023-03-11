const MovieService = require('../services/MovieService')

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: '', result: [] };

        let movies = await MovieService.buscarTodos()

        for (let i in movies) {
            json.result.push({
                id: movies[i].id,
                name: movies[i].name,
                MidiaType: movies[i].MidiaType
            })
        }
        res.json(json)
    },

    buscarUm: async (req, res) => {
        let json = { error: '', result: {} };

        let id = req.params.id
        let movie = await MovieService.buscarUm(id)

        if (movie) {
            json.result = movie;
        }

        res.json(json)
    },

    inserir: async (req, res) => {
        let json = { error: '', result: {} };

        let name = req.body.name;
        let MidiaType = req.body.MidiaType;

        if (name && MidiaType) {
            let movieId = await MovieService.inserir(name, MidiaType)
            json.result = {
                id: movieId,
                name,
                MidiaType
            }
        } else {
            json.error = 'Campo não enviados'
        }

        res.json(json)
    },

    alterar: async (req, res) => {
        let json = { error: '', result: {} };

        let id = req.params.id
        let name = req.body.name;
        let MidiaType = req.body.MidiaType

        if(id && name && MidiaType) {
            await MovieService.alterar(id, name, MidiaType);
            json.result = {
                id,
                name,
                MidiaType
            }
        } else {
            json.error = 'Campos não enviados'
        }

        res.json(json)
    },

    excluir: async (req, res) => {
        let json = { error: '', result: {} };

        await MovieService.excluir(req.params.id)

        res.json(json)
    }
}