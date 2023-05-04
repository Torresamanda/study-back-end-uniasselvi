const JobsServices = require('../services/JobsServices')

module.exports = {
    fetchAll: async (req, res) => {
        let json = { error: '', result: [] };

        let jobs = await JobsServices.fetchAll()

        for (let i in jobs) {
            json.result.push({
                id: jobs[i].id,
                name: jobs[i].name,
                linguagens: jobs[i].linguagens,
                regiao: jobs[i].regiao,
                tipo: jobs[i].tipo,
                descricao: jobs[i].descricao,
                salario: jobs[i].salario,
            })
        }
        res.json(json)
    },

    buscarOne: async (req, res) => {
        let json = { error: '', result: {} };

        let id = req.params.id
        let jobs = await JobsServices.buscarOne(id)

        if (jobs) {
            json.result = jobs;
        }

        res.json(json)
    },

    insert: async (req, res) => {
        let json = { error: '', result: {} };

        let name = req.body.name;
        let linguagens = req.body.linguagens;
        let regiao = req.body.regiao;
        let tipo = req.body.tipo;
        let descricao = req.body.descricao;
        let salario = req.body.salario;

        if (name && linguagens && regiao && tipo && descricao && salario) {
            let jobsId = await JobsServices.insert(name, linguagens, regiao, tipo, descricao, salario)
            json.result = {
                id: jobsId,
                name,
                linguagens, 
                regiao, 
                tipo, 
                descricao, 
                salario
            }
        } else {
            json.error = 'Campo não enviados'
        }

        res.json(json)
    },
}