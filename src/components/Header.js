import React from 'react';
import { useAppContext } from '../AppContext';
import logo from '../assets/images/tabapay.svg'; // Ensure the logo path is correct

function Header() {
  const { state } = useAppContext();

  return (
    <header className="header d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-start">
        <a href="/">
          <img src={logo} alt="Logo" className="header-logo" />
        </a>
      </div>
    </header>
  );
}

export default Header;
