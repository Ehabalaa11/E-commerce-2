import React from 'react';
import { Link } from 'react-router';

const Error = () => {
  return (
    <>
      <div
        style={{ paddingTop: '100px', height: '100vh', textAlign: 'center' }}>
        <h1 style={{ fontSize: '100px', color: 'purple', margin: '0' }}>404</h1>
        <p style={{ fontSize: '20px', marginBottom: '20px' }}>Not Found Page</p>
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            padding: '10px 20px',
            backgroundColor: 'purple',
            color: 'white',
            borderRadius: '5px',
          }}>
          Return To Home
        </Link>
      </div>
    </>
  );
};

export default Error;
