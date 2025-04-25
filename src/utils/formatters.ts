export const formatCurrency = (amount: number, includeSymbol = true): string => {
  // Format as Indian currency (with commas at thousands, lakhs, crores)
  const formatter = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
    style: includeSymbol ? 'currency' : 'decimal',
    currency: 'INR',
    currencyDisplay: 'symbol'
  });
  
  return formatter.format(amount).replace('₹', '');
};