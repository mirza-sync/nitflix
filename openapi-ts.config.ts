import { defineConfig } from "@hey-api/openapi-ts";

const TMDB_API = {
  v3: "https://developer.themoviedb.org/openapi/64542913e1f86100738e227f", // stable
  v4: "https://developer.themoviedb.org/openapi/6453cc549c91cf004cd2a015",
};

export default defineConfig({
  input: TMDB_API.v3,
  output: {
    path: "./api-codegen",
    format: false,
    lint: false,
  },
  types: {
    enums: "javascript",
  },
  client: "@hey-api/client-axios",
});
