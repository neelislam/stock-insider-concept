export type InsiderTrade = {
  id: string;
  ticker: string;
  company: string;
  sector: string;
  insider: string;
  role: "CEO" | "CFO" | "Director" | "Officer";
  type: "purchase" | "sale";
  transactionCode: "P" | "S";
  shares: number;
  pricePerShare: number;
  value: number;
  transactionDate: string;
  filedAt: string; // e.g. "Sep 11, 2026 09:24"
  signal: string;   // e.g. "Large CEO Purchase"
  signalStrength: "High" | "Medium" | "Low";
};

// Route Parameter List for Type-Safe Navigation
export type RootStackParamList = {
  Home: undefined;
  Screener: undefined;
  Details: { tradeId: string };
};