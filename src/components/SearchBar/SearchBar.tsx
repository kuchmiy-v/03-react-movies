import { useState, type ChangeEvent, type SyntheticEvent } from 'react';
import css from './SearchBar.module.css';

// 1. Інтерфейс пропсів за схемою Ім’яКомпонентаProps
interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [query, setQuery] = useState<string>('');

  // Типізація події введення тексту
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // 2. Типізація події сабміту формы
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Перевірка на порожній ввід
    if (query.trim() === '') {
      alert('Please enter a search query!');
      return;
    }

    // Передаємо значення у батьківський компонент App
    onSubmit(query.trim());
    setQuery('');
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          className={css.input}
          value={query}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search movies..."
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
    </header>
  );
}