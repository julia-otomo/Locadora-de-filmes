import { Request, Response } from "express";
import movies from "./database";
import IMovie from "./interfaces";

const createMovie = (request: Request, response: Response): Response => {
  const newMovie = {
    id: movies.length + 1,
    ...request.body,
  };

  movies.push(newMovie);

  return response.status(201).json(newMovie);
};

const listMovies = (request: Request, response: Response): Response => {
  const { category } = request.query;

  const filterMovies: IMovie[] = movies.filter(
    (movie) => movie.category === category
  );

  if (filterMovies.length > 0) {
    return response.json(filterMovies);
  }

  return response.json(movies);
};

const getSpecificMovie = (request: Request, response: Response): Response => {
  const movieIndex = response.locals.movie;

  return response.json(movies[movieIndex]);
};

const updateMovie = (request: Request, response: Response): Response => {
  const movieIndex = response.locals.movie;

  movies[movieIndex] = {
    ...movies[movieIndex],
    ...request.body,
  };

  return response.json(movies[movieIndex]);
};

const deleteMovie = (request: Request, response: Response): Response => {
  const movieIndex = response.locals.movie;

  movies.splice(movieIndex, 1);

  return response.status(204).send();
};

export { createMovie, listMovies, getSpecificMovie, updateMovie, deleteMovie };
