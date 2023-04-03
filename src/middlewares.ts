import { Request, Response, NextFunction } from "express";
import movies from "./database";

const verifyMovieId = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const movieId = Number(request.params.id);

  const movieIndex = movies.findIndex((movie) => movie.id === movieId);

  if (movieIndex === -1) {
    return response.status(404).json({
      error: "Movie not found!",
    });
  }

  response.locals.movie = movieIndex;

  return next();
};

const verifyMovieName = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const movieName: string = request.body.name;

  const searchMovie = movies.find((movie) => movie.name === movieName);

  if (searchMovie) {
    return response.status(409).json({
      error: "Movie name already exists!",
    });
  }
};

export { verifyMovieId, verifyMovieName };
