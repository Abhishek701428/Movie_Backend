import { Request, Response } from 'express';
import axios from 'axios';

const API_KEY = process.env.OMDB_API_KEY;
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

export const searchMovies = async (req: Request, res: Response) => {
  const { title, genre } = req.query;

  try {
    const response = await axios.get(`${BASE_URL}&s=${title || ''}&type=${genre || ''}`);

    // Check if response contains valid data
    if (!response.data || !response.data.Search) {
      console.error('No movies found');
      return res.status(404).json({ error: 'No movies found' });
    }

    const movies = response.data.Search.map((movie: any) => ({
      title: movie.Title,
      year: movie.Year,
      synopsis: movie.Plot,
      poster: movie.Poster
    }));

    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};
