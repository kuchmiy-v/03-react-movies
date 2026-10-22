import { useEffect, type KeyboardEvent } from 'react';
import Modal from 'react-modal';
import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css';

// Прив'язуємо модальне вікно до кореня додатка для accessibility (доступності)
Modal.setAppElement('#root');

interface MovieModalProps {
  isOpen: boolean;
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieModal({
  isOpen,
  movie,
  onClose,
}: MovieModalProps) {
  if (!movie) return null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : 'https://via.placeholder.com/780x439?text=No+Backdrop';

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
      contentLabel="Movie Details"
    >
      <div className={css.content}>
        <button onClick={onClose} className={css.closeBtn} aria-label="Close">
          &times;
        </button>
        <img src={backdropUrl} alt={movie.title} className={css.image} />
        <div className={css.details}>
          <h2>{movie.title}</h2>
          <p className={css.releaseDate}>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p className={css.rating}>
            <strong>Rating:</strong> ⭐ {movie.vote_average.toFixed(1)} / 10
          </p>
          <p className={css.overview}>{movie.overview}</p>
        </div>
      </div>
    </Modal>
  );
}