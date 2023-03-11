const express = require('express')
const router = express.Router()

const MovieController = require('./controllers/MovieController')

router.get('/movies', MovieController.buscarTodos)
router.get('/movie/:id', MovieController.buscarUm)
router.post('/movie', MovieController.inserir)
router.put('/movie/:id', MovieController.alterar)
router.delete('/movie/:id', MovieController.excluir)

module.exports = router