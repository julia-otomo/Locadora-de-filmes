import { Request, Response, NextFunction, query } from "express";
import { client } from "./database";
import { QueryConfig } from "pg";
import { IMovieResult } from "./interfaces";

const verifyMovieId = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const movieId = Number(request.params.id);

  const findMovie: string = `
  SELECT * FROM movies WHERE id = $1
  `;

  const queryConfig: QueryConfig = {
    text: findMovie,
    values: [movieId],
  };

  const result: IMovieResult = await client.query(queryConfig);

  if (result.rowCount === 0) {
    return response.status(404).json({
      error: "Movie not found!",
    });
  }

  response.locals.movie = result;
  response.locals.id = movieId;

  return next();
};

const verifyMovieName = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const movieName: string = request.body.name;

  const searchMovie: string = `
  SELECT * FROM movies WHERE name = $1
  `;

  const queryConfig: QueryConfig = {
    text: searchMovie,
    values: [movieName],
  };

  const result: IMovieResult = await client.query(queryConfig);

  if (result.rowCount > 0) {
    return response.status(409).json({
      error: "Movie name already exists!",
    });
  }

  return next();
};

const listByCategory = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { category } = request.query;

  if (category) {
    const filterMovies: string = `
    SELECT * FROM movies WHERE category = $1
  `;

    const queryConfig: QueryConfig = {
      text: filterMovies,
      values: [category],
    };

    const queryResult: IMovieResult = await client.query(queryConfig);

    if (queryResult.rowCount > 0) {
      return response.json(queryResult.rows);
    } else {
      return next();
    }
  }

  return next();
};

export { verifyMovieId, verifyMovieName, listByCategory };
