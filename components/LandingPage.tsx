"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Bot, Users, Zap, Shield, ArrowRight, CheckCircle } from 'lucide-react';

export default function LandingPage() {
    const router = useRouter();
  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Lead Generation',
      description: 'Automatically extract leads from conversations using advanced AI technology'
    },
    {
      icon: Users,
      title: 'Smart CRM Management',
      description: 'Manage your restaurant leads with an intuitive and powerful interface'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Processing',
      description: 'Process conversations and generate leads in seconds, not hours'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with reliable data protection'
    }
  ];

  const benefits = [
    'Increase lead conversion by 3x',
    'Save 10+ hours per week on data entry',
    'Never miss a potential customer',
    'Streamline your sales process'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">FoodBot CRM</span>
            </div>
            <div className="flex items-center space-x-4">
              <p
                onClick={()=>router.push("/login")}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Login
              </p>
              <p
                onClick={()=>router.push("/signup")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Get Started
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Conversations
              <span className="block text-blue-600">Into Qualified Leads</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              FoodBot CRM uses advanced AI to automatically extract the information and help you to create potential leads.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <p
                onClick={()=>router.push("/signup")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
              >
                Start 
                <ArrowRight className="ml-2 h-5 w-5" />
              </p>
            </div>
          </div>
        </div>
      </section>


    

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-1 lg:gap-16 items-center">
           
            <div className="mt-12 lg:mt-0">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <Bot className="h-8 w-8 text-blue-600 mr-3" />
                  <span className="text-lg font-semibold text-gray-900">AI Lead Extraction</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 italic">
                    "Hi! Are you the owner of La Taquería? We're looking for a POS system with CRM features..."
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900">✅ Lead Created:</div>
                    <div className="text-gray-600">Name: La Taquería</div>
                    <div className="text-gray-600">Interest: POS System, CRM</div>
                    <div className="text-gray-600">Status: New</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Bot className="h-8 w-8 text-blue-400 mr-3" />
            <span className="text-2xl font-bold">FoodBot CRM</span>
          </div>
          <p className="text-center text-gray-400 mt-4">
            © 2025 FoodBot CRM. All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}