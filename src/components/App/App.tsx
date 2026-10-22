import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import MovieList from '../MovieList/MovieList';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { fetchMoviesByQuery } from '../../services/tmdb-api';
import type { Movie } from '../../types/movie';
import css from './App.module.css';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // Стан для модального вікна
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Хендлер для передачі запиту з SearchBar
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setMovies([]); // Очищаємо попередні результати
  };

  // Відкриття модалки
  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  // Закриття модалки
  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  useEffect(() => {
    // Якщо запит порожній — HTTP-запит не виконуємо
    if (!query) return;

    const getMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMoviesByQuery(query);
        setMovies(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [query]);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {error && <ErrorMessage />}

      {movies.length > 0 && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}

      {loading && <Loader />}

      {/* Модальне вікно */}
      <MovieModal
        isOpen={Boolean(selectedMovie)}
        movie={selectedMovie}
        onClose={handleCloseModal}
      />
    </div>
  );
}