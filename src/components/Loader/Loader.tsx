import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.container}>
      <p>Loading movies, please wait...</p>
    </div>
  );
}