import React, { useState } from 'react';
import Ingresos from '../Ingresos/Ingresos';
import GastosHome from '../Gastos/GastosHome';
import TrabajosAdmin from '../Trabajos/TrabajosAdmin';
import DashboarHome from './DashboarAdminHome';
import CustomButton from "../../../common/Components/Button/CustomButton";
import MensajesAdmin from '../Mensajes/MensajesAdmin';

const MODULES = [
  { key: 'dashboard', label: 'Dashboard', component: DashboarHome },
  { key: 'ingresos', label: 'Ingresos', component: Ingresos },
  { key: 'gastos', label: 'Gastos', component: GastosHome },
  { key: 'trabajos', label: 'Trabajos', component: TrabajosAdmin },
  { key: 'mensajes', label: 'Mensajes', component: MensajesAdmin },
];

const ControlHome = () => {
  const [selected, setSelected] = useState('dashboard');

  const renderModule = () => {
    const mod = MODULES.find(m => m.key === selected);
    const Component = mod ? mod.component : null;
    return Component ? <Component /> : <div>Seleccione un módulo.</div>;
  };

  return (
    <div className="admin-container">
      <div className="admin-tabs-container no-scrollbar">
        {MODULES.map(mod => (
          <button
            key={mod.key}
            className={`admin-tab-button ${selected === mod.key ? 'active' : ''}`}
            onClick={() => setSelected(mod.key)}
          >
            {mod.label}
          </button>
        ))}
      </div>

      <div className="admin-content-fade-in">
        {renderModule()}
      </div>
    </div>
  );
};

export default ControlHome;
