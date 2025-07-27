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
              <span className="text-2xl font-bold text-gray-900">
                FoodBot CRM
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <p
                onClick={() => router.push("/login")}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Login
              </p>
              <p
                onClick={() => router.push("/signup")}
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
              FoodBot CRM uses advanced AI to automatically extract and manage
              restaurant leads from your sales conversations. Stop losing
              potential customers and start growing your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <p
                onClick={() => router.push("/signup")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </p>
              <p
                onClick={() => router.push("/login")}
                className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200"
              >
                Watch Demo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Scale
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed specifically for restaurant sales teams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-200">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Restaurant Owners Choose FoodBot CRM
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join hundreds of successful restaurant sales teams who have
                transformed their lead generation process with our AI-powered
                platform.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <p
                onClick={() => router.push("/signup")}
                className="inline-flex items-center mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </p>
            </div>

            <div className="mt-12 lg:mt-0">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <Bot className="h-8 w-8 text-blue-600 mr-3" />
                  <span className="text-lg font-semibold text-gray-900">
                    AI Lead Extraction
                  </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 italic">
                    "Hi! Are you the owner of La Taquería? We're looking for a
                    POS system with CRM features..."
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900">
                      ✅ Lead Created:
                    </div>
                    <div className="text-gray-600">Name: La Taquería</div>
                    <div className="text-gray-600">
                      Interest: POS System, CRM
                    </div>
                    <div className="text-gray-600">Status: New</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Sales Process?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the revolution in restaurant lead management. Start your free
            trial today.
          </p>
          <p
            onClick={() => router.push("/signup")}
            className="inline-flex items-center bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </p>
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
            © 2025 FoodBot CRM. All rights reserved. Built for restaurant
            success.
          </p>
        </div>
      </footer>
    </div>
  );
}