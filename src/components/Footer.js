import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from 'react-icons/fa';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <Link href="#">Cookies Policy</Link> - <Link href="#">Legal Notice</Link>
      </div>
      <div className="footer-center">
        Copyright © 2021 Made with <span className="heart">♥</span> from seopossible
      </div>
      <div className="footer-right">
        <Link href="#"><FaFacebookF /></Link>
        <Link href="#"><FaInstagram /></Link>
        <Link href="#"><FaTwitter /></Link>
        <Link href="#"><FaPinterestP /></Link>
      </div>
    </footer>
  );
};

export default Footer;