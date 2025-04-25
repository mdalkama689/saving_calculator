import React, { useState } from 'react';
import { CalculatorForm } from './CalculatorForm';
import { ResultsSummary } from './ResultsSummary';
import { SavingsChart } from './SavingsChart';
import { SavingsTips } from './SavingsTips';
import { calculateSavings } from '../utils/calculations';
import { SavingsResult } from '../types/savings';

export const Calculator: React.FC = () => {
  const [results, setResults] = useState<SavingsResult | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const handleCalculate = (formData: {
    targetAmount: number;
    initialAmount: number;
    interestRate: number;
    duration: number;
    frequency: string;
  }) => {
    const savingsResult = calculateSavings(
      formData.targetAmount,
      formData.initialAmount,
      formData.interestRate,
      formData.duration,
      formData.frequency
    );
    
    setResults(savingsResult);
    setIsCalculated(true);
    
    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Plan Your Savings Goal
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate how much you need to save regularly to achieve your financial goals.
          Enter your target amount, timeframe, and other details to get started.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-10">
        <div className="p-6 md:p-8">
          <CalculatorForm onCalculate={handleCalculate} />
        </div>
      </div>

      {isCalculated && results && (
        <div id="results" className="space-y-10 transition-all duration-500 ease-in-out">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Savings Plan</h3>
              <ResultsSummary results={results} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Savings Growth Projection</h3>
              <SavingsChart results={results} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-6 md:p-8">
              <SavingsTips duration={results.timelineMonths} amount={results.periodicAmount} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};