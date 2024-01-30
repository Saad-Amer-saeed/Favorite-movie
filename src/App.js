import { WatchedSummary } from "./MainComponenet/WatchedBox/WatchedSummary";
import { WatchedList } from "./MainComponenet/WatchedBox/WatchedList";
import { Nav } from "./NavComponenet/Nav";
import { Loader } from "./MainComponenet/Loader";
import { Main } from "./MainComponenet/Main";
import { Search } from "./NavComponenet/Search";
import { Box } from "./MainComponenet/ListBox/Box";
import { WatchedBox } from "./MainComponenet/WatchedBox/WatchedBox";
import { NumResults } from "./NavComponenet/NumResults";
import { MovieList } from "./MainComponenet/ListBox/MovieList";
import { ErrorMessage } from "./MainComponenet/ErrorMessage";
import { useEffect, useState } from "react";
import { SelectedMovie } from "./MainComponenet/SelectedMovie";
const KEY = `4017baa1`;

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handelSelectMovie(id) {
    setSelectedId((prevalue) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handelAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handelDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortErroe");
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Nav>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Nav>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList handelSelectMovie={handelSelectMovie} movies={movies} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <SelectedMovie
              handleCloseMovie={handleCloseMovie}
              selectedId={selectedId}
              handelAddWatched={handelAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                handelDeleteWatched={handelDeleteWatched}
                watched={watched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
