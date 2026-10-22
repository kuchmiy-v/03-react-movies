import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({
  message = 'Something went wrong. Please try again later!',
}: ErrorMessageProps) {
  return (
    <div className={css.error}>
      <p>{message}</p>
    </div>
  );
}