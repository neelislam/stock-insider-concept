import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Search } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/trade';
import { mockTrades } from '../data/mockTrades';
import { colors } from '../theme/colors';
import { formatMillionValue } from '../utils/formatters';
import { SummaryCard } from '../components/SummaryCard';
import { TradeCard } from '../components/TradeCard';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Home'> };

export default function HomeScreen({ navigation }: Props) {
  // Deriving summary metrics from local data array (Section 5)
  const totalTrades = mockTrades.length;
  const purchaseValue = mockTrades.filter(t => t.type === 'purchase').reduce((sum, t) => sum + t.value, 0);
  const saleValue = mockTrades.filter(t => t.type === 'sale').reduce((sum, t) => sum + t.value, 0);
  
  // Suggested Header and Subtitle design from PDF
  return (
    <View style={styles.container}>
      <Text style={styles.fictionalBadge}>FICTIONAL DEMO DATA</Text>
      
      {/* Search entry point navigating to Screener (Section 5) */}
      <TouchableOpacity 
        style={styles.searchBar} 
        onPress={() => navigation.navigate('Screener')}
        accessibilityLabel="Navigate to Search"
      >
        <Search color={colors.textSecondary} size={18} />
        <Text style={styles.searchBarText}>Search ticker or company</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Three compact summary cards (Section 5) */}
        <View style={styles.summaryRow}>
          <SummaryCard title="Transactions" value={`${totalTrades} filings`} />
          <SummaryCard title="Purchases" value={formatMillionValue(purchaseValue)} />
          <SummaryCard title="Sales" value={formatMillionValue(saleValue)} />
        </View>

        {/* Top Signals Section (Section 5) */}
        <Text style={styles.subHeader}>Top Signals Today</Text>
        <View style={styles.signalsRow}>
          <View style={styles.signalChip}><Text style={styles.signalText}>Large CEO Purchase</Text></View>
          <View style={styles.signalChip}><Text style={styles.signalText}>Cluster Buy</Text></View>
          <View style={styles.signalChip}><Text style={styles.signalText}>Executive Sale</Text></View>
        </View>

        {/* Latest Activity List Header (Section 5) */}
        <View style={styles.listHeaderRow}>
          <Text style={styles.subHeader}>Latest Activity</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Screener')}>
            <Text style={styles.analyticsText}>View all trades</Text>
          </TouchableOpacity>
        </View>

        {/* Four latest activity cards (Section 5) */}
        {mockTrades.slice(0, 4).map(trade => (
          <TradeCard 
            key={trade.id} 
            trade={trade} 
            onPress={() => navigation.navigate('Details', { tradeId: trade.id })} 
          />
        ))}
        
        {/* Rhythm spacing bottom buffer */}
        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  fictionalBadge: { 
    color: colors.analytics, 
    fontSize: 10, 
    fontWeight: 'bold', 
    letterSpacing: 1, 
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: colors.surface, 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 24, // 24px rhythm spacing
    borderWidth: 1,
    borderColor: '#374151',
  },
  searchBarText: { color: colors.textSecondary, marginLeft: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  subHeader: { fontSize: 18, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 12 },
  signalsRow: { flexDirection: 'row', gap: 8, marginBottom: 24, flexWrap: 'wrap' },
  signalChip: { backgroundColor: colors.surface, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16 },
  signalText: { color: colors.analytics, fontSize: 12, fontWeight: '500' },
  listHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  analyticsText: { color: colors.analytics, fontSize: 12, fontWeight: 'bold' },
});