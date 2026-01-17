import React from 'react';
import { useAuth } from '../../../context/useAuth';
import CustomButton from '../../../common/Components/Button/CustomButton';

export default function AdminHeader() {
    const { user, logout } = useAuth();

    return (
        <header className="flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b border-[var(--border-subtle)] gap-4">
            <div>
                <h1 className="admin-title-gradient text-2xl md:text-3xl">Panel de Control</h1>
                <p className="text-[var(--muted)] text-sm mt-1">
                    Bienvenido, <span className="text-[var(--brand-400)] font-semibold">{user?.username || 'Usuario'}</span>
                </p>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden md:flex flex-col items-end mr-2">
                    <span className="text-xs text-[var(--muted)] uppercase tracking-wider">Rol</span>
                    <span className="text-sm font-medium text-[var(--ink)]">
                        {user?.groups?.[0] || 'Staff'}
                    </span>
                </div>
                <div className="h-8 w-[1px] bg-[var(--border-subtle)] mx-2 hidden md:block"></div>
                <CustomButton
                    variant="outline-danger"
                    size="sm"
                    onClick={logout}
                    startIcon={<i className="fas fa-sign-out-alt"></i>}
                >
                    Cerrar Sesión
                </CustomButton>
            </div>
        </header>
    );
}
