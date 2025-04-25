import { SavingsResult } from '../types/savings';

export const calculateSavings = (
  targetAmount: number,
  initialAmount: number,
  interestRate: number,
  timelineMonths: number,
  frequency: string
): SavingsResult => {
  // Convert annual interest rate to the appropriate periodic rate
  const annualRate = interestRate / 100;
  let periodsPerYear = 12; // Default for monthly
  
  switch (frequency) {
    case 'daily':
      periodsPerYear = 365;
      break;
    case 'weekly':
      periodsPerYear = 52;
      break;
    case 'monthly':
      periodsPerYear = 12;
      break;
    case 'quarterly':
      periodsPerYear = 4;
      break;
    case 'yearly':
      periodsPerYear = 1;
      break;
  }
  
  const periodicRate = annualRate / periodsPerYear;
  const totalPeriods = Math.ceil(timelineMonths * periodsPerYear / 12);
  
  // Calculate the periodic payment required to reach the target amount
  // Using the formula: PMT = (FV - PV*(1+r)^n) / (((1+r)^n - 1) / r)
  const futureValue = targetAmount;
  const presentValue = initialAmount;
  
  const compoundFactor = Math.pow(1 + periodicRate, totalPeriods);
  const periodicAmount = (futureValue - presentValue * compoundFactor) / 
                         ((compoundFactor - 1) / periodicRate);
  
  // Generate growth data for the chart
  const growthData = [];
  let currentBalance = initialAmount;
  let totalPrincipal = initialAmount;
  
  // Get the monthly intervals for the chart (simplify if too many periods)
  const dataPointInterval = Math.max(1, Math.ceil(totalPeriods / 120)); // At most 120 points
  
  for (let i = 0; i <= totalPeriods; i++) {
    if (i % dataPointInterval === 0 || i === totalPeriods) {
      growthData.push({
        period: i,
        principal: totalPrincipal,
        interest: currentBalance - totalPrincipal,
        balance: currentBalance
      });
    }
    
    if (i < totalPeriods) {
      const interestEarned = currentBalance * periodicRate;
      currentBalance = currentBalance + interestEarned + periodicAmount;
      totalPrincipal += periodicAmount;
    }
  }
  
  const finalBalance = currentBalance;
  const totalContributions = totalPrincipal;
  const totalInterest = finalBalance - totalContributions;
  
  return {
    targetAmount,
    initialAmount,
    periodicAmount,
    timelineMonths,
    frequency,
    totalContributions,
    totalInterest,
    finalBalance,
    growthData
  };
};