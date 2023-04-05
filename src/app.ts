import express, { Application, json } from "express";
import { listByCategory, verifyMovieId, verifyMovieName } from "./middlewares";
import {
  createMovie,
  deleteMovie,
  getSpecificMovie,
  listMovies,
  updateMovie,
} from "./logic";
import { startDatabase } from "./database";

const app: Application = express();

app.use(json());

const PORT: number = 3000;

app.post("/movies", verifyMovieName, createMovie);

app.get("/movies", listByCategory, listMovies);

app.get("/movies/:id", verifyMovieId, getSpecificMovie);

app.patch("/movies/:id", verifyMovieId, verifyMovieName, updateMovie);

app.delete("/movies/:id", verifyMovieId, deleteMovie);

app.listen(PORT, async () => {
  await startDatabase();
  console.log(`Server running on https://localhost:${PORT}`);
});
