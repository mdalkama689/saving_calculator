import React, { useState } from 'react';
import { CurrencyInput } from './CurrencyInput';
import { Target, Calendar, Percent, PiggyBank, Calendar as CalendarIcon } from 'lucide-react';

interface CalculatorFormProps {
  onCalculate: (formData: {
    targetAmount: number;
    initialAmount: number;
    interestRate: number;
    duration: number;
    frequency: string;
  }) => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ onCalculate }) => {
  const [targetAmount, setTargetAmount] = useState<number>(100000);
  const [initialAmount, setInitialAmount] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(6);
  const [duration, setDuration] = useState<number>(24);
  const [frequency, setFrequency] = useState<string>('monthly');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      targetAmount,
      initialAmount,
      interestRate,
      duration,
      frequency,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium">
            <Target size={18} className="text-indigo-600" />
            Target Amount (₹)
          </label>
          <CurrencyInput
            value={targetAmount}
            onChange={setTargetAmount}
            min={1000}
            className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            placeholder="Enter your goal amount"
          />
          <p className="text-xs text-gray-500">How much do you want to save?</p>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium">
            <PiggyBank size={18} className="text-indigo-600" />
            Initial Amount (₹)
          </label>
          <CurrencyInput
            value={initialAmount}
            onChange={setInitialAmount}
            min={0}
            className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            placeholder="Starting amount (optional)"
          />
          <p className="text-xs text-gray-500">How much have you already saved?</p>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium">
            <Calendar size={18} className="text-indigo-600" />
            Time Period (months)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            min={1}
            max={600}
            className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            placeholder="Number of months"
          />
          <p className="text-xs text-gray-500">How long do you want to save for?</p>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium">
            <Percent size={18} className="text-indigo-600" />
            Interest Rate (% per year)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            min={0}
            max={50}
            step={0.1}
            className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            placeholder="Annual interest rate"
          />
          <p className="text-xs text-gray-500">Expected annual return on your savings</p>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium">
            <CalendarIcon size={18} className="text-indigo-600" />
            Contribution Frequency
          </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none bg-white"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <p className="text-xs text-gray-500">How often will you contribute?</p>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full py-3 px-6 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Calculate Your Savings Plan
        </button>
      </div>
    </form>
  );
};