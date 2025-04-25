import React, { useEffect, useRef } from 'react';
import { SavingsResult } from '../types/savings';
import { formatCurrency } from '../utils/formatters';

interface SavingsChartProps {
  results: SavingsResult;
}

export const SavingsChart: React.FC<SavingsChartProps> = ({ results }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    const { growthData } = results;
    const dataPoints = growthData.length;
    const padding = 40;
    const width = canvasRef.current.width - padding * 2;
    const height = canvasRef.current.height - padding * 2;
    const maxValue = Math.max(...growthData.map(point => point.balance));
    
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height + padding);
    ctx.lineTo(width + padding, height + padding);
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw grid lines
    const gridLines = 5;
    ctx.beginPath();
    for (let i = 1; i <= gridLines; i++) {
      const y = padding + height - (height * i) / gridLines;
      ctx.moveTo(padding, y);
      ctx.lineTo(width + padding, y);
      
      // Add y-axis labels
      ctx.fillStyle = '#64748B';
      ctx.font = '12px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(
        `₹${formatCurrency(maxValue * i / gridLines)}`, 
        padding - 10, 
        y + 5
      );
    }
    ctx.strokeStyle = '#EFF6FF';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Draw x-axis labels (every 12 months)
    const labelInterval = Math.max(1, Math.floor(dataPoints / 6));
    ctx.fillStyle = '#64748B';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    for (let i = 0; i < dataPoints; i += labelInterval) {
      const x = padding + (width * i) / (dataPoints - 1);
      ctx.fillText(`${i}m`, x, height + padding + 20);
    }
    
    // Draw principal amount line
    ctx.beginPath();
    for (let i = 0; i < dataPoints; i++) {
      const x = padding + (width * i) / (dataPoints - 1);
      const y = padding + height - (height * growthData[i].principal) / maxValue;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.strokeStyle = '#818CF8';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw area under principal line
    ctx.beginPath();
    ctx.moveTo(padding, height + padding);
    for (let i = 0; i < dataPoints; i++) {
      const x = padding + (width * i) / (dataPoints - 1);
      const y = padding + height - (height * growthData[i].principal) / maxValue;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width + padding, height + padding);
    ctx.closePath();
    ctx.fillStyle = 'rgba(129, 140, 248, 0.2)';
    ctx.fill();
    
    // Draw total balance line
    ctx.beginPath();
    for (let i = 0; i < dataPoints; i++) {
      const x = padding + (width * i) / (dataPoints - 1);
      const y = padding + height - (height * growthData[i].balance) / maxValue;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.strokeStyle = '#4F46E5';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw area between principal and total balance
    ctx.beginPath();
    for (let i = 0; i < dataPoints; i++) {
      const x = padding + (width * i) / (dataPoints - 1);
      const y = padding + height - (height * growthData[i].principal) / maxValue;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    for (let i = dataPoints - 1; i >= 0; i--) {
      const x = padding + (width * i) / (dataPoints - 1);
      const y = padding + height - (height * growthData[i].balance) / maxValue;
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(79, 70, 229, 0.2)';
    ctx.fill();
    
  }, [results]);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-indigo-600 rounded-full"></div>
          <span className="text-sm text-gray-600">Total Balance</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-indigo-300 rounded-full"></div>
          <span className="text-sm text-gray-600">Principal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-indigo-100 rounded-full"></div>
          <span className="text-sm text-gray-600">Interest</span>
        </div>
      </div>
      
      <div className="relative bg-white rounded-lg border border-gray-100 p-4">
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={400} 
          className="w-full h-auto"
        ></canvas>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-indigo-50 rounded-lg p-4">
          <h5 className="text-sm font-medium text-indigo-700 mb-1">Principal Amount</h5>
          <p className="text-xl font-bold text-indigo-800">
            ₹{formatCurrency(results.totalContributions)}
          </p>
        </div>
        <div className="bg-emerald-50 rounded-lg p-4">
          <h5 className="text-sm font-medium text-emerald-700 mb-1">Interest Earned</h5>
          <p className="text-xl font-bold text-emerald-800">
            ₹{formatCurrency(results.totalInterest)}
          </p>
        </div>
      </div>
    </div>
  );
};