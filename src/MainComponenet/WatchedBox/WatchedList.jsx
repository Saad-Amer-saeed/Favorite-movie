import { WatchedMovie } from "./WatchedMovie";

export function WatchedList({ watched, handelDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          handelDeleteWatched={handelDeleteWatched}
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}
