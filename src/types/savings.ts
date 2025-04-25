export interface GrowthDataPoint {
  period: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface SavingsResult {
  targetAmount: number;
  initialAmount: number;
  periodicAmount: number;
  timelineMonths: number;
  frequency: string;
  totalContributions: number;
  totalInterest: number;
  finalBalance: number;
  growthData: GrowthDataPoint[];
}