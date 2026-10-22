import type { Movie } from '../../types/movie';
import css from './MovieList.module.css';

interface MovieListProps {
  movies: Movie[];
  onSelectMovie?: (movie: Movie) => void;
}

export default function MovieList({ movies, onSelectMovie }: MovieListProps) {
  return (
    <ul className={css.list}>
      {movies.map((movie) => {
        const posterUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : 'https://via.placeholder.com/500x750?text=No+Poster';

        return (
          <li
            key={movie.id}
            className={css.card}
            onClick={() => onSelectMovie && onSelectMovie(movie)}
          >
            <img src={posterUrl} alt={movie.title} className={css.image} />
            <div className={css.content}>
              <h3 className={css.title}>{movie.title}</h3>
              <p className={css.date}>{movie.release_date}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}