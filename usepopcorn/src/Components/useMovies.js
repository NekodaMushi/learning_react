import { useEffect, useState } from "react";

export const KEY = "7b15cb43";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      callback?.();
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies       ");
          }

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      // if (query.length > 3) fetchMovies();

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      } // Best practice
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  ); //empty array means that the effect will only be executed after the component first mount
  return { movies, isLoading, error };
}
