import React from 'react';
import { Lightbulb, TrendingUp, Shield, Coins } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface SavingsTipsProps {
  duration: number;
  amount: number;
}

export const SavingsTips: React.FC<SavingsTipsProps> = ({ duration, amount }) => {
  const isLongTerm = duration > 60; // More than 5 years
  const isHighAmount = amount > 10000; // More than ₹10,000 per month
  
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="text-amber-500" size={24} />
        <h3 className="text-2xl font-bold text-gray-800">Smart Savings Tips</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLongTerm && (
          <div className="bg-amber-50 p-5 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="text-amber-600" size={20} />
              <h4 className="font-semibold text-amber-800">Consider Equity Investments</h4>
            </div>
            <p className="text-amber-700 text-sm">
              For long-term goals (5+ years), consider investing a portion in equity mutual funds for potentially higher returns.
            </p>
          </div>
        )}
        
        {!isLongTerm && (
          <div className="bg-blue-50 p-5 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="text-blue-600" size={20} />
              <h4 className="font-semibold text-blue-800">Stay Liquid</h4>
            </div>
            <p className="text-blue-700 text-sm">
              For short-term goals, prioritize liquid investments like high-yield savings accounts or short-term deposits.
            </p>
          </div>
        )}
        
        {isHighAmount && (
          <div className="bg-purple-50 p-5 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Coins className="text-purple-600" size={20} />
              <h4 className="font-semibold text-purple-800">Diversify Your Savings</h4>
            </div>
            <p className="text-purple-700 text-sm">
              With a monthly contribution of ₹{formatCurrency(amount)}, consider diversifying across different investment options for better risk management.
            </p>
          </div>
        )}
        
        <div className="bg-emerald-50 p-5 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="text-emerald-600" size={20} />
            <h4 className="font-semibold text-emerald-800">Automate Your Savings</h4>
          </div>
          <p className="text-emerald-700 text-sm">
            Set up automatic transfers to a dedicated savings account on the day you receive your income to maintain discipline.
          </p>
        </div>
      </div>
      
      <div className="mt-6 p-5 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-3">Additional Resources</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <a href="#" className="hover:text-indigo-600 transition-colors">Guide to Different Investment Options in India</a>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <a href="#" className="hover:text-indigo-600 transition-colors">Tax Benefits on Various Savings Instruments</a>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <a href="#" className="hover:text-indigo-600 transition-colors">Understanding Risk and Return in Financial Planning</a>
          </li>
        </ul>
      </div>
    </div>
  );
};