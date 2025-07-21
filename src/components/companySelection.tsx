import React, { useState } from 'react';
import { User, Company } from '../types';
import { Building2, ChevronDown } from 'lucide-react';

interface CompanySelectionProps {
  user: User;
  onCompanySelect: (company: Company) => void;
}

const CompanySelection: React.FC<CompanySelectionProps> = ({ user, onCompanySelect }) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock companies data
  const companies: Company[] = [
    { id: 'comp1', name: 'ABC Trading Ltd', database: 'abc_trading_db', status: 'active' },
    { id: 'comp2', name: 'XYZ Manufacturing Co', database: 'xyz_manufacturing_db', status: 'active' },
    { id: 'comp3', name: 'Global Services Ltd', database: 'global_services_db', status: 'active' },
  ];

  const handleConnect = async () => {
    if (!selectedCompanyId) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const selectedCompany = companies.find(c => c.id === selectedCompanyId);
    if (selectedCompany) {
      onCompanySelect(selectedCompany);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Fortacc</h1>
          <p className="text-gray-600 mt-2">Select Company</p>
        </div>

        {/* User Info */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-blue-800">
            Welcome, <span className="font-semibold">{user.username}</span>
          </p>
          <p className="text-xs text-blue-600 capitalize">Role: {user.type}</p>
        </div>

        {/* Company Selection */}
        <div className="space-y-6">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              Select Company
            </label>
            <div className="relative">
              <select
                id="company"
                value={selectedCompanyId}
                onChange={(e) => setSelectedCompanyId(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Choose a company...</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <button
            onClick={handleConnect}
            disabled={!selectedCompanyId || isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? 'Connecting...' : 'Connect'}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm">
            <span className="text-blue-600 font-medium">Disclaimer</span>
            <span className="text-blue-600 font-medium">About Us</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySelection;