'use client';

import React, { useState } from 'react';
import {
  Bot, MessageSquare, Loader2, CheckCircle, AlertCircle
} from 'lucide-react';
import { useAuth } from '@/context/Authcontext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/Navbar';

export default function AIAgent() {
  const [conversation, setConversation] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!conversation.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);
    setMessage('');

    try {
      const response = await axios.post('/api/leads', {
        request: conversation,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      const data = response.data;
      const { command, lead, leadss, updated } = data.result;

      switch (command) {
        case 'createLead':
          setResult(lead);
          setMessage('Lead created successfully!');
          break;
        case 'getLeadById':
          setResult(lead);
          setMessage('Lead fetched successfully!');
          break;
        case 'updateLeadById':
          setResult(updated);
          setMessage('Lead updated successfully!');
          break;
        case 'getAllLeads':
          setResult(leadss);
          setMessage('All leads retrieved!');
          break;
        case 'deleteLeadById':
          setMessage('Lead deleted successfully!');
          setResult(null);
          break;
        default:
          setMessage('Unknown command received.');
          break;
      }

      setConversation('');
    } catch (err: any) {
        if(err.status === 401){
          router.push('/login');
        }
      setError(err.response?.data?.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const sampleConversation = `Sales: Hi! Are you the owner of La Taquería?
Lead: Yes, I run it.
Sales: Are you currently using a POS system?
Lead: No, we're looking for one with CRM features and analytics.
Sales: Great! What's your email?
Lead: la@taqueria.com
Sales: And your phone number?
Lead: 555-123-4567
Lead: We need something that can help us track customer preferences and manage orders efficiently.`;

  const renderLeadCard = (lead: any, index?: number) => (
    <div key={lead.id || index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="font-semibold text-blue-900 mb-2">{lead.name || 'Unnamed Lead'}</h3>
      <div className="text-sm space-y-1">
        <p><strong>Source:</strong> {lead.source || 'N/A'}</p>
        <p><strong>Lead Id :</strong> {lead.id || 'N/A'}</p>
        <p><strong>Email:</strong> {lead.email || 'N/A'}</p>
        <p><strong>Phone:</strong> {lead.phone || 'N/A'}</p>
        <p><strong>Status:</strong> {lead.status || 'New'}</p>
        {lead.notes && <p><strong>Notes:</strong> {lead.notes}</p>}
        {lead.interestedProducts?.length > 0 && (
          <div>
            <strong>Interested Products:</strong>
            <div className="flex flex-wrap gap-1 mt-1">
              {lead.interestedProducts.map((product: string, i: number) => (
                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {product}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
    <Navbar/>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Bot className="h-12 w-12 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">AI Conversation Parser</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Paste your sales conversation below and let our AI extract structured lead information automatically.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Conversation Input
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={conversation}
              onChange={(e) => setConversation(e.target.value)}
              placeholder="Paste your sales conversation here..."
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              disabled={loading}
            />

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setConversation(sampleConversation)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                disabled={loading}
              >
                Use sample conversation
              </button>

              <button
                type="submit"
                disabled={loading || !conversation.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center transition-colors duration-200"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Bot className="h-5 w-5 mr-2" />
                    Parse & Create Lead
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Processing Results</h2>

          {loading && (
            <div className="text-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">AI is analyzing the conversation...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-red-800 font-medium">Error</span>
              </div>
              <p className="text-red-700 mt-1">{error}</p>
            </div>
          )}

          {message && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-800 font-medium">{message}</span>
              </div>
            </div>
          )}

          {!loading && result && (
            <>
              {Array.isArray(result) ? (
                <div className="space-y-4 overflow-y-scroll max-h-[400px] pr-2">
                  {result.map((lead, index) => renderLeadCard(lead, index))}
                </div>
              ) : (
                renderLeadCard(result)
              )}
              
            </>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
