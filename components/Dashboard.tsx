import React, { useState, useEffect } from 'react';
import { Users, Bot, TrendingUp, Clock } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  source: string;
  status: string;
  contact: {
    email?: string;
    phone?: string;
  };
  interestedProducts: string[];
  notes?: string;
  createdAt: string;
}

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    aiGenerated: 0,
    conversionRate: 0
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/leads', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setLeads(data.leads);
        calculateStats(data.leads);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  const calculateStats = (leadsData: Lead[]) => {
    const totalLeads = leadsData.length;
    const newLeads = leadsData.filter(lead => lead.status === 'New').length;
    const aiGenerated = leadsData.filter(lead => lead.source === 'AI Agent').length;
    const conversionRate = totalLeads > 0 ? Math.round((newLeads / totalLeads) * 100) : 0;

    setStats({
      totalLeads,
      newLeads,
      aiGenerated,
      conversionRate
    });
  };

  const statCards = [
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'New Leads',
      value: stats.newLeads,
      icon: TrendingUp,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'AI Generated',
      value: stats.aiGenerated,
      icon: Bot,
      color: 'bg-purple-500',
      change: '+25%'
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      icon: Clock,
      color: 'bg-orange-500',
      change: '+5%'
    }
  ];

  const recentLeads = leads.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your leads.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Leads</h2>
          <div className="space-y-4">
            {recentLeads.length > 0 ? recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div>
                  <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                  <p className="text-sm text-gray-600">{lead.source}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {lead.interestedProducts.slice(0, 2).map((product, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    lead.status === 'New' ? 'bg-green-100 text-green-700' :
                    lead.status === 'Contacted' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {lead.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No leads yet. Start by using the AI Agent to generate leads!</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button 
              onClick={() => window.location.href = '/ai-agent'}
              className="w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border-2 border-dashed border-blue-300 transition-colors duration-200 group"
            >
              <Bot className="h-8 w-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="font-semibold text-blue-900">Parse Conversation</h3>
              <p className="text-sm text-blue-700">Use AI to extract leads from conversations</p>
            </button>
            
            <button 
              onClick={() => window.location.href = '/leads'}
              className="w-full p-4 bg-green-50 hover:bg-green-100 rounded-lg border-2 border-dashed border-green-300 transition-colors duration-200 group"
            >
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="font-semibold text-green-900">Manage Leads</h3>
              <p className="text-sm text-green-700">View and update your lead database</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}