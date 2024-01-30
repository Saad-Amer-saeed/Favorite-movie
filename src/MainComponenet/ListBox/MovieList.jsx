import { Movie } from "./Movie";
export function MovieList({ movies, handelSelectMovie }) {
  return (
    <ul className="list  list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          handelSelectMovie={handelSelectMovie}
        />
      ))}
    </ul>
  );
}
