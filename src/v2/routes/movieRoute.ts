import {Router} from 'express';
import { MovieController } from '../controllers/movieController';

const router = Router();

//http://localhost:3000/api/v2/movies/
router.get('/', MovieController.getAllMovies);
//http://localhost:3000/api/v2/movies/68f5a14ac0e0e89f91cdaa0d
router.get('/:id', MovieController.getMovieById);
//http://localhost:3000/api/v2/movies/ -- { "title": "New Movie", "genres": ["New"],"synopsis": "New","releaseDate": "2010-07-16T00:00:00.000Z","durationMin": 2 }, ID genereré automatiquement : 68f5a3e17aafa400bea086ef
router.post('/', MovieController.createMovie);
//http://localhost:3000/api/v2/movies/68f5a3e17aafa400bea086ef -- { "durationMin": 60 }
router.patch('/:id', MovieController.updateMovie);
//http://localhost:3000/api/v2/movies/68f5a3e17aafa400bea086ef
router.delete('/:id', MovieController.deleteMovie);

export default router;