import { Client } from "pg";

const client: Client = new Client({
  user: "Julia",
  password: "1234",
  host: "localhost",
  database: "movies_sp2",
  port: 5432,
});

const startDatabase = async (): Promise<void> => {
  await client.connect();
  console.log("Database connected");
};

export { client, startDatabase };
