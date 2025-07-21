import React, { useState } from 'react';
import { User } from '../types';
import { Building2, User as UserIcon, Lock, Shield, Info } from 'lucide-react';
import Modal from './Modal';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show disclaimer if not already accepted
    if (!disclaimerAccepted) {
      setShowDisclaimer(true);
      return;
    }
    
    // Proceed with login if disclaimer was accepted
    await performLogin();
  };

  const performLogin = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication
    const mockUser: User = {
      id: '1',
      username: username,
      type: username.toLowerCase() === 'supervisor' ? 'supervisor' : 'accountant',
      companies: ['comp1', 'comp2', 'comp3']
    };
    
    setIsLoading(false);
    onLogin(mockUser);
  };

  const handleDisclaimerAccept = () => {
    setDisclaimerAccepted(true);
    setShowDisclaimer(false);
    // Proceed with login after accepting disclaimer
    performLogin();
  };

  const handleDisclaimerClose = () => {
    setShowDisclaimer(false);
    // Reset form if user closes disclaimer without accepting
    setUsername('');
    setPassword('');
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
          <p className="text-gray-600 mt-2">Multi-Company Accounting System</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              User
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm">
            <button
              onClick={() => setShowDisclaimer(true)}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Disclaimer
            </button>
            <button
              onClick={() => setShowAbout(true)}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              About Us
            </button>
          </div>
        </div>
      </div>

      {/* Disclaimer Modal */}
      <Modal isOpen={showDisclaimer} onClose={handleDisclaimerClose} title="Disclaimer">
        <div className="space-y-4 text-sm text-gray-700">
          <p>
            <strong>Fortacc</strong> is an accounting system designed to facilitate business and financial recordkeeping. 
            While every effort has been made to ensure the accuracy, reliability, and functionality of the system, 
            Fortacc and its developers make no warranties, express or implied, regarding the completeness or accuracy 
            of financial data processed through the platform.
          </p>
          <p>
            Fortacc shall not be held liable for any loss, damage, or liability arising from the use of the system 
            or reliance on its outputs. Users are solely responsible for the accuracy of the information they input 
            and are advised to seek professional accounting or legal advice before making any business decisions 
            based on the system's data.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Data Protection Notice:</h4>
            <p className="text-blue-800">
              In line with the Mauritius Data Protection Act 2017, Fortacc is committed to safeguarding the personal 
              and financial data of all users and entities registered on the system.
            </p>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li>• Data collected by Fortacc is used strictly for accounting, reporting, and business management purposes.</li>
            <li>• Access to user and company data is restricted to authorized users based on role-based permissions.</li>
            <li>• Fortacc implements secure protocols and encryption to protect against unauthorized access.</li>
            <li>• By using Fortacc, you consent to the collection and processing of your data as outlined in our privacy policy.</li>
          </ul>
          <p className="text-sm text-gray-600">
            You retain the right to access, rectify, or request deletion of your personal data at any time. 
            To exercise these rights, please contact the Fortacc Data Protection Officer.
          </p>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleDisclaimerClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDisclaimerAccept}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Accept & Continue
            </button>
          </div>
        </div>
      </Modal>

      {/* About Us Modal */}
      <Modal isOpen={showAbout} onClose={() => setShowAbout(false)} title="About Us - Fortacc Accounting System">
        <div className="space-y-4 text-sm text-gray-700">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Welcome to Fortacc – Your Smart Accounting Partner</h3>
            <p>
              Fortacc is a modern, cloud-based accounting and financial management system designed specifically 
              for businesses in Mauritius. Built with simplicity, compliance, and scalability in mind.
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Our Mission</h4>
            <p className="text-green-800">
              To simplify accounting for Mauritian businesses by providing a reliable, secure, and user-friendly 
              platform that transforms financial data into actionable insights.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Who We Serve</h4>
            <p className="mb-2">Whether you're a startup or SME, Fortacc is built for you. Our platform supports:</p>
            <ul className="space-y-1 text-gray-600">
              <li>• Multi-user and multi-company operations with different access roles</li>
              <li>• Compliance with Mauritian tax and financial reporting standards</li>
              <li>• Secure cloud storage for all financial transactions</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Our Vision</h4>
            <p className="text-blue-800">
              To become the leading digital accounting solution in Mauritius, helping businesses transition 
              to a fully automated, paperless, and cloud-first financial environment.
            </p>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-900 mb-2">Get in Touch</h4>
            <div className="space-y-1 text-gray-600">
              <p>📧 Email: info@fortacc.mu</p>
              <p>📞 Phone: +230 XXX-XXXX</p>
              <p>🌐 Website: www.fortacc.mu</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoginPage;