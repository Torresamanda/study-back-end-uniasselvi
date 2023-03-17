import express from 'express';
const router = express.Router();

const MovieController = require('./controllers/MovieController');

router.get('/movies', MovieController.getAll);
router.get('/movie/:id', MovieController.getMovie);
router.post('/movie', MovieController.setMovie);
router.delete('/movie/:id', MovieController.deleteMovie);

module.exports = router;