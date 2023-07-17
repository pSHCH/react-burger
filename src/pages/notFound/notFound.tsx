import notFoundStyles from './notFound.module.css';

export const NotFoundPage = () => {
  
  return (
    <main className={notFoundStyles.main}>
      <p className={notFoundStyles.error}>404</p>
    </main>
  );
}
