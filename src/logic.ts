import { Request, Response } from "express";
import { client } from "./database";
import { IMovie, IMovieResult } from "./interfaces";
import format from "pg-format";
import { QueryConfig } from "pg";

const createMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const requestBody = request.body;

  const requestKeys: string[] = Object.keys(requestBody);
  const requestValues: string[] = Object.values(requestBody);

  const newMovie: string = `
      INSERT INTO "movies" (%I)
      VALUES (%L)
      RETURNING *;
    `;

  const queryFormat: string = format(newMovie, requestKeys, requestValues);

  const queryResult: IMovieResult = await client.query(queryFormat);
  const movie: IMovie = queryResult.rows[0];

  return response.status(201).json(movie);
};

const listMovies = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const allMovies: string = `
    SELECT * FROM MOVIES
  `;

  const queryResultAllMovies: IMovieResult = await client.query(allMovies);

  return response.json(queryResultAllMovies.rows);
};

const getSpecificMovie = (request: Request, response: Response): Response => {
  const movie = response.locals.movie;

  return response.json(movie.rows[0]);
};

const updateMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movieId = response.locals.id;

  const requestBody = request.body;

  const requestKeys: string[] = Object.keys(requestBody);

  const requestValues: string[] = Object.values(requestBody);

  const updateQuery: string = `
    UPDATE 
      movies 
    SET 
      (%I) = ROW(%L) 
    WHERE 
      id = $1 
    RETURNING *
  `;

  const queryFormat: string = format(updateQuery, requestKeys, requestValues);

  const queryConfig: QueryConfig = {
    text: queryFormat,
    values: [movieId],
  };

  const queryResult: IMovieResult = await client.query(queryConfig);

  return response.json(queryResult.rows[0]);
};

const deleteMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movieId = response.locals.id;

  const deleteMovie: string = `
    DELETE FROM movies WHERE id = $1
  `;

  const queryConfig: QueryConfig = {
    text: deleteMovie,
    values: [movieId],
  };

  const queryResult: IMovieResult = await client.query(queryConfig);

  return response.status(204).send();
};

export { createMovie, listMovies, getSpecificMovie, updateMovie, deleteMovie };
