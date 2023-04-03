import express, { Application, json } from "express";
import { verifyMovieId, verifyMovieName } from "./middlewares";
import {
  createMovie,
  deleteMovie,
  getSpecificMovie,
  listMovies,
  updateMovie,
} from "./logic";

const app: Application = express();

app.use(json());

const PORT: number = 3000;

app.post("/movies", verifyMovieName, createMovie);

app.get("/movies", listMovies);

app.get("/movies/:id", verifyMovieId, getSpecificMovie);

app.patch("/movies/:id", verifyMovieId, verifyMovieName, updateMovie);

app.delete("/movies/:id", verifyMovieId, deleteMovie);

app.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});
