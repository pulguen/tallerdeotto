import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './GlobalLayout.css';
import Navbar from '../Navbar/Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="layout-main">
        {children}
      </main>
      <Footer />
    </>
  );
}
