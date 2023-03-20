import express from 'express';
const router = express.Router();

const MovieController = require('./controllers/MovieController');

router.get('/media', MovieController.getAll);
router.get('/media/:internalId', MovieController.getMovie);
router.post('/media', MovieController.setMovie);
router.delete('/media/:internalId', MovieController.deleteMovie);

module.exports = router;