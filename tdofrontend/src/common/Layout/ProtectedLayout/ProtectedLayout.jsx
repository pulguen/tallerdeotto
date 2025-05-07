import React from 'react';
import Header from '../Header/Header';

export default function ProtectedLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
