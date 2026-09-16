// Local currency formatter (for display consistency, does not imply advice)
export const formatCurrency = (value: number): string => {
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

// Simplified number formatting for cards (e.g. $2.40M)
export const formatMillionValue = (value: number): string => {
  return `$${(value / 1000000).toFixed(2)}M`;
};