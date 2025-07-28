import React, { useState } from 'react';
import { Bot, MessageSquare, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function AIAgent() {
  const [conversation, setConversation] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!conversation.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/ai-agent/parse-and-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ conversation })
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
        setConversation('');
      } else {
        setError(data.message || 'Failed to process conversation');
      }
    } catch (error) {
      console.error('Error processing conversation:', error);
      setError('An error occurred while processing the conversation');
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-900 dark:text-white">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Bot className="h-12 w-12 text-blue-600 dark:text-blue-400 mr-3" />
          <h1 className="text-3xl font-bold">AI Conversation Parser</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Paste your sales conversation below and let our AI extract structured lead information automatically.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
            <MessageSquare className="h-5 w-5 mr-2" />
            Conversation Input
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <textarea
                value={conversation}
                onChange={(e) => setConversation(e.target.value)}
                placeholder="Paste your sales conversation here..."
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={loading}
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setConversation(sampleConversation)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                disabled={loading}
              >
                Use sample conversation
              </button>

              <button
                type="submit"
                disabled={loading || !conversation.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center transition-colors duration-200"
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">AI Processing Results</h2>

          {!result && !error && !loading && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <Bot className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Submit a conversation to see AI-extracted lead data</p>
            </div>
          )}

          {loading && (
            <div className="text-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300">AI is analyzing the conversation...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-red-800 dark:text-red-300 font-medium">Error</span>
              </div>
              <p className="text-red-700 dark:text-red-200 mt-1">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-green-800 dark:text-green-300 font-medium">Lead Created Successfully!</span>
                </div>
                <p className="text-green-700 dark:text-green-200 text-sm">
                  The conversation has been analyzed and a new lead has been added to your database.
                </p>
              </div>

              {result.lead && (
                <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Extracted Lead Information:</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Restaurant Name:</span>
                      <span className="ml-2">{result.lead.name}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Source:</span>
                      <span className="ml-2">{result.lead.source}</span>
                    </div>
                    {result.lead.contact?.email && (
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Email:</span>
                        <span className="ml-2">{result.lead.contact.email}</span>
                      </div>
                    )}
                    {result.lead.contact?.phone && (
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Phone:</span>
                        <span className="ml-2">{result.lead.contact.phone}</span>
                      </div>
                    )}
                    {result.lead.interestedProducts?.length > 0 && (
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Interested Products:</span>
                        <div className="ml-2 mt-1 flex flex-wrap gap-1">
                          {result.lead.interestedProducts.map((product: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 text-xs rounded-full">
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {result.lead.notes && (
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Notes:</span>
                        <span className="ml-2">{result.lead.notes}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Status:</span>
                      <span className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-700 text-green-700 dark:text-white text-xs rounded-full">
                        {result.lead.status}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center">
                <button
                  onClick={() => window.location.href = '/leads'}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
                >
                  View All Leads
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-12 bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["Paste Conversation", "Copy and paste your sales conversation or call transcript"],
            ["AI Analysis", "Our AI extracts structured data from the unstructured text"],
            ["Lead Created", "A new lead is automatically added to your CRM database"]
          ].map(([title, desc], i) => (
            <div className="text-center" key={i}>
              <div className="bg-blue-100 dark:bg-blue-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 dark:text-white font-bold">{i + 1}</span>
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">{title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
