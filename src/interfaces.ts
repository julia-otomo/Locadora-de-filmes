import { QueryResult } from "pg";

interface IMovie {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
}

type IMovieResult = QueryResult<IMovie>;
type IMovieCreate = Omit<IMovie, "id">;

export { IMovie, IMovieResult, IMovieCreate };
