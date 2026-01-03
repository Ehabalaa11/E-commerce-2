import React from 'react';

const Footer = () => {
  return (
    <>
      <footer className="text-center py-3 mt-4 bg-light shadow-sm">
        <p className='mb-0'>© {new Date().getFullYear()} My Library – Keep reading, keep growing.</p>
      </footer>
    </>
  );
};

export default Footer;
