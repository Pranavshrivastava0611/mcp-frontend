"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, Bot, Menu, X } from "lucide-react";
import { useAuth } from "@/context/Authcontext";
import { log } from "console";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navigation = [
    { name: "AI Agent", href: "/ai-agent", icon: Bot },
    
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand */}
          <div
            onClick={() => router.push("/")}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Bot className="h-7 w-7 text-blue-600" />
            <span className="text-lg font-bold text-gray-900">FoodBot CRM</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map(({ name, href, icon: Icon }) => (
              <button
                key={name}
                onClick={() => router.push(href)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition ${
                  pathname === href
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm text-gray-700">Welcome! {user?.username || "guest"}</span>
            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-3 space-y-1 border-t border-gray-200">
          {navigation.map(({ name, href, icon: Icon }) => (
            <button
              key={name}
              onClick={() => {
                router.push(href);
                setMobileMenuOpen(false);
              }}
              className={`flex w-full items-center px-3 py-2 rounded-md text-sm font-medium transition ${
                pathname === href
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {name}
            </button>
          ))}
          <div className="mt-2 flex flex-col space-y-2">
            <span className="text-sm text-gray-700">Welcome! {user?.username || "guest"}</span>
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
                router.push("/login");
              }}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
