"use client"

import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Phone, Mail } from 'lucide-react';

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

export default function LeadManagement() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    source: '',
    email: '',
    phone: '',
    interestedProducts: '',
    status: 'New',
    notes: ''
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, searchTerm, statusFilter]);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/leads', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setLeads(data.leads);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = leads;

    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.source.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter && statusFilter !== 'All') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    setFilteredLeads(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const leadData = {
      name: formData.name,
      source: formData.source,
      contact: {
        email: formData.email,
        phone: formData.phone
      },
      interestedProducts: formData.interestedProducts.split(',').map(p => p.trim()),
      status: formData.status,
      notes: formData.notes
    };

    try {
      const token = localStorage.getItem('token');
      const url = editingLead ? `/api/leads/${editingLead.id}` : '/api/leads';
      const method = editingLead ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(leadData)
      });

      const data = await response.json();
      
      if (data.success) {
        fetchLeads();
        resetForm();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving lead:', error);
    }
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
    setFormData({
      name: lead.name,
      source: lead.source,
      email: lead.contact.email || '',
      phone: lead.contact.phone || '',
      interestedProducts: lead.interestedProducts.join(', '),
      status: lead.status,
      notes: lead.notes || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (leadId: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      
      if (data.success) {
        fetchLeads();
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      source: '',
      email: '',
      phone: '',
      interestedProducts: '',
      status: 'New',
      notes: ''
    });
    setEditingLead(null);
  };

  const statuses = ['All', 'New', 'Contacted', 'Qualified', 'Closed'];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-600 mt-2">Manage and track your restaurant leads</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center transition-colors duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Lead
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                      {lead.notes && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">{lead.notes}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      {lead.contact.email && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          {lead.contact.email}
                        </div>
                      )}
                      {lead.contact.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          {lead.contact.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{lead.source}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {lead.interestedProducts.slice(0, 2).map((product, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {product}
                        </span>
                      ))}
                      {lead.interestedProducts.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{lead.interestedProducts.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      lead.status === 'New' ? 'bg-green-100 text-green-700' :
                      lead.status === 'Contacted' ? 'bg-blue-100 text-blue-700' :
                      lead.status === 'Qualified' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(lead)}
                        className="text-blue-600 hover:text-blue-700 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredLeads.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">No leads found</div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingLead ? 'Edit Lead' : 'Add New Lead'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source
                </label>
                <input
                  type="text"
                  required
                  value={formData.source}
                  onChange={(e) => setFormData({...formData, source: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Cold Call, Website, Referral"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interested Products (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.interestedProducts}
                  onChange={(e) => setFormData({...formData, interestedProducts: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., POS System, CRM, Analytics"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200"
                >
                  {editingLead ? 'Update' : 'Create'} Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}