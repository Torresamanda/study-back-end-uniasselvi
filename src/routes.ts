import express from 'express';
import { Request, Response } from 'express';
import * as MovieController from './controllers/MovieController';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Bem-vindo à API de filmes!');
});

router.get('/media', MovieController.getAll);
router.get('/media/:internalId', MovieController.getMovie);
router.post('/media', MovieController.setMovie);
router.delete('/media/:internalId', MovieController.deleteMovie);


export default router;


