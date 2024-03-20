import React from 'react';
import { useAppContext } from '../AppContext';

function Footer() {
  const { state } = useAppContext();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      Copyright &copy; {currentYear}. TabaPay, Inc. All rights reserved.
    </footer>
  );
}

export default Footer;