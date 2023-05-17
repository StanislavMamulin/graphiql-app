import { NavLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <main>
        <div>
          <p>404</p>
          <h2>Page not found</h2>
          <p>Sorry, we couldn’t find the page you’re looking for.</p>
          <div>
            <NavLink to="/">Go back home</NavLink>
          </div>
        </div>
      </main>
    </>
  );
}
