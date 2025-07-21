import React from 'react';
import { User, Company } from '../types';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  FileText, 
  Building,
  BarChart3,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface DashboardContentProps {
  user: User;
  company: Company;
  activeModule: string;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ user, company, activeModule }) => {
  if (activeModule !== 'dashboard') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {activeModule.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </h2>
          <p className="text-gray-600">
            This module is under development. The full functionality will be available soon.
          </p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Revenue',
      value: 'MUR 2,350,000',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Active Customers',
      value: '1,234',
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Pending Invoices',
      value: '47',
      change: '-8.1%',
      changeType: 'negative' as const,
      icon: FileText,
      color: 'orange'
    },
    {
      title: 'Suppliers',
      value: '189',
      change: '+2.3%',
      changeType: 'positive' as const,
      icon: Building,
      color: 'purple'
    }
  ];

  const recentTransactions = [
    { id: 1, type: 'Invoice', customer: 'ABC Corp', amount: 'MUR 25,000', date: '2024-01-15', status: 'Paid' },
    { id: 2, type: 'Payment', customer: 'XYZ Ltd', amount: 'MUR 15,000', date: '2024-01-14', status: 'Pending' },
    { id: 3, type: 'Invoice', customer: 'Global Co', amount: 'MUR 35,000', date: '2024-01-13', status: 'Paid' },
    { id: 4, type: 'Credit Note', customer: 'Tech Solutions', amount: 'MUR 5,000', date: '2024-01-12', status: 'Processed' },
  ];

  const pendingTasks = [
    { id: 1, task: 'Review VAT Returns', priority: 'high', dueDate: '2024-01-20' },
    { id: 2, task: 'Bank Reconciliation', priority: 'medium', dueDate: '2024-01-18' },
    { id: 3, task: 'Monthly Financial Report', priority: 'high', dueDate: '2024-01-25' },
    { id: 4, task: 'Audit Trail Review', priority: 'low', dueDate: '2024-01-30' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.username}</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with {company.name} today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
            <BarChart3 className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{transaction.type}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-600">{transaction.customer}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{transaction.amount}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    transaction.status === 'Paid' ? 'bg-green-100 text-green-800' :
                    transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Pending Tasks</h2>
            <Calendar className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{task.task}</p>
                    <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                  <AlertCircle className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-blue-900">New Invoice</p>
          </button>
          <button className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-green-900">Record Payment</p>
          </button>
          <button className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-purple-900">Add Customer</p>
          </button>
          <button className="p-4 bg-orange-50 rounded-lg text-center hover:bg-orange-100 transition-colors">
            <BarChart3 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-orange-900">View Reports</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;