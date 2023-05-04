const express = require('express')
const router = express.Router()

const JobsController = require('./controllers/JobsControllers')

router.get('/jobs', JobsController.fetchAll)
router.get('/job/:id', JobsController.buscarOne)
router.post('/job', JobsController.insert)



module.exports = router