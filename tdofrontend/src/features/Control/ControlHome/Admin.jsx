import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Ingresos from '../Ingresos/Ingresos';
import GastosHome from '../Gastos/GastosHome';
import DashboardHome from './DashboarAdminHome';

const MODULES = [
  { key: 'dashboard', label: 'Dashboard', component: <DashboardHome /> },
  { key: 'ingresos', label: 'Ingresos', component: <Ingresos /> },
  { key: 'gastos', label: 'Gastos', component: <GastosHome /> },
  // Agregá más módulos aquí
];

const ControlHome = () => {
  // Ahora el default es 'dashboard'
  const [selected, setSelected] = useState('dashboard');

  const renderModule = () => {
    const mod = MODULES.find(m => m.key === selected);
    return mod ? mod.component : <div>Seleccione un módulo.</div>;
  };

  return (
    <div className="panel-control-home">
      <nav>
        <ul style={{ display: 'flex', gap: 16, listStyle: 'none', padding: 0 }}>
          {MODULES.map(mod => (
            <li key={mod.key}>
              <button
                className={`panel-nav-btn${selected === mod.key ? ' active' : ''}`}
                onClick={() => setSelected(mod.key)}
                style={{
                  fontWeight: selected === mod.key ? 'bold' : 'normal',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer'
                }}
              >
                {mod.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div style={{ marginTop: 24 }}>
        {renderModule()}
      </div>
    </div>
  );
};

export default ControlHome;
