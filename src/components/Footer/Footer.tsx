import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} NewsApp [Edgar Verduzco]</p>
    </footer>
  );
};

export default Footer;
