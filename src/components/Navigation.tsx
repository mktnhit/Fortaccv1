import React, { useState } from 'react';
import { User, Company } from '../types';
import { 
  Building2, 
  LogOut, 
  Menu, 
  X, 
  FileText, 
  Edit, 
  Settings, 
  TrendingUp, 
  BarChart3,
  ChevronDown,
  RefreshCw,
  Plus,
  Save,
  Printer,
  Layout,
  Users,
  Shield,
  Lock,
  Calendar,
  DollarSign,
  Receipt,
  CreditCard,
  Banknote,
  Calculator,
  FileBarChart,
  PieChart,
  TrendingDown,
  Building,
  Archive
} from 'lucide-react';

interface NavigationProps {
  user: User;
  company: Company;
  onLogout: () => void;
  onChangeCompany: () => void;
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  user, 
  company, 
  onLogout, 
  onChangeCompany, 
  activeModule, 
  setActiveModule 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isSupervisor = user.type === 'supervisor';

  const menuItems = [
    {
      id: 'file',
      label: 'File',
      icon: FileText,
      items: [
        { id: 'change-company', label: 'Change Of Company', icon: RefreshCw, onClick: onChangeCompany },
        { id: 'new-company', label: 'New Company', icon: Plus, supervisorOnly: true },
        { id: 'backup', label: 'Backup', icon: Save },
        { id: 'restore', label: 'Restore', icon: Archive, supervisorOnly: true },
        { id: 'printer-setup', label: 'Printer Setup', icon: Printer },
        { id: 'invoice-design', label: 'Invoice Design', icon: Layout },
      ]
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: Edit,
      items: [
        { id: 'general-ledger', label: 'General Ledger', icon: FileBarChart },
        { id: 'customer', label: 'Customer', icon: Users },
        { id: 'supplier', label: 'Supplier', icon: Building },
        { id: 'exchange-rates', label: 'Exchange Rates', icon: DollarSign },
        { id: 'vat', label: 'VAT', icon: Receipt },
      ]
    },
    {
      id: 'setup',
      label: 'Setup',
      icon: Settings,
      items: [
        { id: 'company-parameters', label: 'Company Parameters', icon: Building2, supervisorOnly: true },
        { id: 'audit-trail', label: 'Audit Trail', icon: Shield, supervisorOnly: true },
        { id: 'lock-accounting', label: 'Lock / Unlock Accounting Period', icon: Lock },
        { id: 'lock-tax', label: 'Lock / Unlock TAX Period', icon: Calendar },
        { id: 'user-access', label: 'User Access', icon: Users, supervisorOnly: true },
      ]
    },
    {
      id: 'process',
      label: 'Process',
      icon: TrendingUp,
      items: [
        { id: 'sales-invoices', label: 'Sales Invoices', icon: Receipt },
        { id: 'credit-note', label: 'Credit Note', icon: CreditCard },
        { id: 'journal-general', label: 'Journal General', icon: FileText },
        { id: 'journal-customer', label: 'Journal Customer', icon: Users },
        { id: 'journal-supplier', label: 'Journal Supplier', icon: Building },
        { id: 'purchases-supplier-bill', label: 'Purchases Supplier Bill', icon: FileBarChart },
        { id: 'return-supplier', label: 'Return to Supplier', icon: TrendingDown },
        { id: 'revaluation-bank', label: 'Revaluation Bank', icon: Banknote },
        { id: 'revaluation-customer', label: 'Revaluation Customer', icon: Users },
        { id: 'revaluation-supplier', label: 'Revaluation Supplier', icon: Building },
        { id: 'cashbook-receipts', label: 'Cashbook Receipts', icon: DollarSign },
        { id: 'cashbook-payment', label: 'Cashbook Payment', icon: CreditCard },
        { id: 'bank-reconciliation', label: 'Bank Reconciliation', icon: Calculator },
        { id: 'fixed-asset-register', label: 'Fixed Asset Register', icon: Archive },
      ]
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart3,
      items: [
        { id: 'tb', label: 'Trial Balance', icon: FileBarChart },
        { id: 'is', label: 'Income Statement', icon: TrendingUp },
        { id: 'sofp', label: 'Statement of Financial Position', icon: PieChart },
        { id: 'gl', label: 'General Ledger', icon: FileText },
        { id: 'vat-report', label: 'VAT Report', icon: Receipt },
        { id: 'goods-services', label: 'Goods & Services Statement', icon: FileBarChart },
        { id: 'ap-ageing', label: 'AP Ageing', icon: Calendar },
        { id: 'ar-ageing', label: 'AR Ageing', icon: Calendar },
        { id: 'ap-detail', label: 'AP Detail', icon: FileText },
        { id: 'ar-detail', label: 'AR Detail', icon: FileText },
        { id: 'sme', label: 'SME Report', icon: Building },
        { id: 'ifrs', label: 'IFRS Report', icon: FileBarChart },
        { id: 'far', label: 'Fixed Asset Report', icon: Archive },
        { id: 'income-tax', label: 'Income Tax', icon: DollarSign },
      ]
    }
  ];

  const handleDropdownToggle = (menuId: string) => {
    setOpenDropdown(openDropdown === menuId ? null : menuId);
  };

  const handleMenuItemClick = (item: any) => {
    if (item.onClick) {
      item.onClick();
    } else {
      setActiveModule(item.id);
    }
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Company */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Fortacc</span>
            </div>
            <div className="hidden md:block">
              <span className="text-sm text-gray-500">|</span>
              <span className="ml-2 text-sm font-medium text-gray-700">{company.name}</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((menu) => (
              <div key={menu.id} className="relative">
                <button
                  onClick={() => handleDropdownToggle(menu.id)}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <menu.icon className="w-4 h-4 mr-1" />
                  {menu.label}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>

                {openDropdown === menu.id && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    {menu.items.map((item) => {
                      if (item.supervisorOnly && !isSupervisor) return null;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleMenuItemClick(item)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center"
                        >
                          <item.icon className="w-4 h-4 mr-3" />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* User Info and Logout */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-700">{user.username}</p>
              <p className="text-xs text-gray-500 capitalize">{user.type}</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {menuItems.map((menu) => (
              <div key={menu.id}>
                <button
                  onClick={() => handleDropdownToggle(menu.id)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <menu.icon className="w-4 h-4 mr-2" />
                    {menu.label}
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === menu.id ? 'rotate-180' : ''}`} />
                </button>
                
                {openDropdown === menu.id && (
                  <div className="ml-4 mt-1 space-y-1">
                    {menu.items.map((item) => {
                      if (item.supervisorOnly && !isSupervisor) return null;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleMenuItemClick(item)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors flex items-center"
                        >
                          <item.icon className="w-4 h-4 mr-3" />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;