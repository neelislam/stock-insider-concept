import { InsiderTrade } from '../types/trade';

// Purely local fictional mock/demo content inspired by StockInsider.io product categories.
export const mockTrades: InsiderTrade[] = [
  { 
    id: '1', ticker: 'NOVA', company: 'NovaGrid Systems', sector: 'Tech', insider: 'Maya Chen', role: 'CEO', 
    type: 'purchase', transactionCode: 'P', shares: 24000, pricePerShare: 100, value: 2400000, 
    transactionDate: 'Sep 10, 2026', filedAt: 'Sep 11, 2026 09:24', signal: 'Large CEO Purchase', signalStrength: 'High' 
  },
  { 
    id: '2', ticker: 'ELIO', company: 'Elio Health Labs', sector: 'Health', insider: 'John Doe', role: 'CFO', 
    type: 'sale', transactionCode: 'S', shares: 8000, pricePerShare: 85, value: 680000, 
    transactionDate: 'Sep 09, 2026', filedAt: 'Sep 10, 2026 14:10', signal: 'Executive Sale', signalStrength: 'High' 
  },
  { 
    id: '3', ticker: 'VOLT', company: 'VoltArc Energy', sector: 'Energy', insider: 'Sarah Smith', role: 'Director', 
    type: 'purchase', transactionCode: 'P', shares: 16000, pricePerShare: 70, value: 1120000, 
    transactionDate: 'Sep 08, 2026', filedAt: 'Sep 09, 2026 11:00', signal: 'Cluster Buy', signalStrength: 'High' 
  },
  { 
    id: '4', ticker: 'AURI', company: 'Auri Cloudworks', sector: 'Tech', insider: 'Mike Jones', role: 'Officer', 
    type: 'sale', transactionCode: 'S', shares: 3000, pricePerShare: 80, value: 240000, 
    transactionDate: 'Sep 07, 2026', filedAt: 'Sep 08, 2026 16:45', signal: 'Routine Sale', signalStrength: 'Low' 
  },
  { 
    id: '5', ticker: 'MESA', company: 'Mesa Robotics', sector: 'Manufacturing', insider: 'Tom Hardy', role: 'CEO', 
    type: 'purchase', transactionCode: 'P', shares: 10000, pricePerShare: 86, value: 860000, 
    transactionDate: 'Sep 06, 2026', filedAt: 'Sep 07, 2026 10:20', signal: 'Leadership Buy', signalStrength: 'Medium' 
  },
  { 
    id: '6', ticker: 'LYRA', company: 'Lyra Commerce', sector: 'Retail', insider: 'Jane Lee', role: 'CFO', 
    type: 'purchase', transactionCode: 'P', shares: 6000, pricePerShare: 85, value: 510000, 
    transactionDate: 'Sep 05, 2026', filedAt: 'Sep 06, 2026 09:15', signal: 'CFO Accumulation', signalStrength: 'Medium' 
  },
  { 
    id: '7', ticker: 'ORBT', company: 'Orbit Transit Tech', sector: 'Transport', insider: 'Alex King', role: 'Director', 
    type: 'sale', transactionCode: 'S', shares: 25000, pricePerShare: 70, value: 1750000, 
    transactionDate: 'Sep 04, 2026', filedAt: 'Sep 05, 2026 13:30', signal: 'Large Sale', signalStrength: 'High' 
  },
  { 
    id: '8', ticker: 'SOLA', company: 'Sola Materials', sector: 'Materials', insider: 'Chris Pratt', role: 'Director', 
    type: 'purchase', transactionCode: 'P', shares: 2000, pricePerShare: 65, value: 130000, 
    transactionDate: 'Sep 03, 2026', filedAt: 'Sep 04, 2026 15:50', signal: 'New Position', signalStrength: 'Low' 
  }
];