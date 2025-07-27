"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Bot, Users, BarChart3 } from 'lucide-react';

export default function Navbar() {
    const router = useRouter();
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Leads', href: '/leads', icon: Users },
    { name: 'AI Agent', href: '/ai-agent', icon: Bot },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <p onClick={()=>router.push("/")} className="flex items-center justify-center space-x-2 mb-6">
              <Bot className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">FoodBot CRM</span>
            </p>
            
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <p
                    key={item.name}
                    onClick={()=>router.push(item.href)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              {/* Welcome, {user?.name} */}hello
            </span>
            <button
            //   onClick={logout}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}