import { Router } from 'express';
import { searchMovies } from '../../Controller/Assets/MovieContrrller';

const router = Router();

router.get('/search', searchMovies);

export default router;
