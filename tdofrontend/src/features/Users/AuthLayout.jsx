// src/features/Users/AuthLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Glow decorativo */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />

      <header className="px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          {/* LOGO REAL desde /public */}
          <img
            src="/logoHome.png"
            alt="El Taller de Otto"
            className="h-9 w-auto rounded-md ring-1 ring-white/20 bg-white/5 p-1 group-hover:scale-[1.02] transition"
            width="120"
            height="36"
            decoding="async"
          />
          <span className="text-white/90 font-semibold tracking-wide">El Taller de Otto</span>
        </Link>
      </header>

      <main className="px-4 py-6">
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl">
            <div className="px-6 pt-6 pb-2">
              <h1 className="text-white text-2xl font-bold">
                {title || 'Tu panel de cliente'}
              </h1>
              <p className="text-slate-300 mt-1">
                {subtitle || 'Seguimiento de pedidos, mensajes y presupuestos en un solo lugar.'}
              </p>
            </div>
            <div className="p-6">{children}</div>
          </div>
          {footer && <div className="text-center text-slate-300 mt-6">{footer}</div>}
        </div>
      </main>

      <footer className="px-6 py-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} El Taller de Otto — Todos los derechos reservados
      </footer>
    </div>
  );
}
