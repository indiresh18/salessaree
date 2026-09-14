import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AdminSidebar } from '../components/admin/AdminSidebar';

export const AdminLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // If owner is not authenticated, redirect to /admin login screen
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal flex flex-col lg:flex-row">
      <AdminSidebar />
      <main className="flex-1 lg:pl-64 p-4 sm:p-6 lg:p-8 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
