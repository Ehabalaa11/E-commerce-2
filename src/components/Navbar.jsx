import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
  return (
    <>
      <nav className='navbar bg-body-tertiary container-fluid'>
        <div className='container-fluid'>
          <span className='navbar-brand mb-0 h1'>Ecommerce</span>
          <div>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive
                  ? ' text-decoration-none me-3 text-secondary text-dark fw-bolder'
                  : 'text-decoration-none me-3 text-secondary text-dark '
              }>
              <i className='fa-solid fa-house'></i>
            </NavLink>
            {localStorage.getItem('token') && (
              <NavLink
                to='/profile'
                className={({ isActive }) =>
                  isActive
                    ? ' text-decoration-none me-3 text-secondary text-dark fw-bolder'
                    : 'text-decoration-none me-3 text-secondary text-dark'
                }>
                <i className='fa-solid fa-user'></i>
              </NavLink>
            )}
            {!localStorage.getItem('token') && (
              <NavLink
                to='/auth/login'
                className={({ isActive }) =>
                  isActive
                    ? ' text-decoration-none me-3 text-secondary text-dark fw-bolder'
                    : 'text-decoration-none me-3 text-secondary text-dark'
                }>
                <i className='fa-solid fa-right-to-bracket'></i>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
