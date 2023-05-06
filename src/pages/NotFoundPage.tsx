import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <main className="">
        <div className="">
          <p className="">404</p>
          <h2 className="">Page not found</h2>
          <p className="">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="">
            <NavLink className="" to="/">
              Go back home
            </NavLink>
          </div>
        </div>
      </main>
    </>
  );
}
