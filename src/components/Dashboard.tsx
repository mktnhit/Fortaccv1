import React, { useState } from 'react';
import { User, Company } from '../types';
import Navigation from './Navigation';
import DashboardContent from './DashboardContent';

interface DashboardProps {
  user: User;
  company: Company;
  onLogout: () => void;
  onChangeCompany: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, company, onLogout, onChangeCompany }) => {
  const [activeModule, setActiveModule] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        user={user} 
        company={company} 
        onLogout={onLogout}
        onChangeCompany={onChangeCompany}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
      />
      
      <div className="pt-16">
        <DashboardContent 
          user={user} 
          company={company} 
          activeModule={activeModule}
        />
      </div>
    </div>
  );
};

export default Dashboard;