import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "https://developer.themoviedb.org/openapi/64542913e1f86100738e227f",
  output: {
    path: "src/client",
    format: false,
    lint: false,
  },
  types: {
    enums: "javascript",
  },
});
