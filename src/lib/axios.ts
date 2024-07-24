import { createClient } from "@hey-api/client-axios";

export const axiosClient = createClient({
  baseURL: "https://api.themoviedb.org",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
  },
});
