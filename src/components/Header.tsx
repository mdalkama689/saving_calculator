import React from 'react';
import { IndianRupee } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 text-white p-2 rounded-lg">
            <IndianRupee size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">SavingsGoal</h1>
            <p className="text-xs text-gray-500">Plan your financial future</p>
          </div>
        </div>
        
       
      </div>
    </header>
  );
};