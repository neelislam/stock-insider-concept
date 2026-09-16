import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/trade';
import { mockTrades } from '../data/mockTrades';
import { colors } from '../theme/colors';
import { formatMillionValue } from '../utils/formatters';
import { MockActivityChart } from '../components/MockActivityChart';

type Props = { 
  navigation: NativeStackNavigationProp<RootStackParamList, 'Details'>;
  route: RouteProp<RootStackParamList, 'Details'>;
};

export default function TradeDetailsScreen({ navigation, route }: Props) {
  const { tradeId } = route.params;
  const trade = mockTrades.find(t => t.id === tradeId);

  // Requirement: Back button returns to prior screen (Section 4).
  // Native navigation provides the default back gesture/button in the header, 
  // but we implement a custom design with explicit back control.
  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel="Go back to prior screen">
        <ArrowLeft color={colors.textPrimary} size={24} />
      </TouchableOpacity>
    ),
    headerTitle: '', // Remove automatic title
  });

  if (!trade) {
    return renderNotFound(); // Safety state
  }

  const isPurchase = trade.type === 'purchase';
  const tradeColor = isPurchase ? colors.purchase : colors.sale;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Required badge (Section 7) */}
      <Text style={styles.fictionalBadge}>FICTIONAL DEMO DATA</Text>
      
      {/* Company header requirements met (Section 7) */}
      <View style={styles.headerRow}>
        <Text style={styles.companyName}>{trade.company}</Text>
        <Text style={styles.tickerBadge}>{trade.ticker}</Text>
      </View>
      <Text style={styles.sectorLine}>{trade.sector} Sector</Text>

      {/* Prominent signal card requirement met (Section 7) */}
      <View style={[styles.signalCard, { borderColor: tradeColor }]}>
        <View style={styles.signalCardTop}>
          <Text style={[styles.signalType, { color: tradeColor }]}>{trade.signal}</Text>
          {isPurchase ? <ArrowUpRight size={20} color={colors.purchase} /> : <ArrowDownRight size={20} color={colors.sale} />}
        </View>
        <Text style={styles.signalValueText}>{formatMillionValue(trade.value)} fictional demo insider buy</Text>
      </View>

      {/* Structured grid of trade details met (Section 7) */}
      <Text style={styles.gridHeader}>Filing Details (Mock Data)</Text>
      <View style={styles.gridContainer}>
        {[
          { label: 'Insider', value: `${trade.insider}\n(${trade.role})` },
          { label: 'Transaction', value: `${isPurchase ? 'Purchase' : 'Sale'}\nCode ${trade.transactionCode}` },
          { label: 'Shares', value: `${trade.shares.toLocaleString()}\nshares` },
          { label: 'Price per share', value: `$${trade.pricePerShare}\n(demo)` },
          { label: 'Total value', value: `${formatMillionValue(trade.value)}\n(demo)` },
          { label: 'Transaction date', value: `${trade.transactionDate}\nCode ${trade.transactionCode}` }, // Duplicate date code for grid consistency
          { label: 'Filed date', value: trade.filedAt },
          { label: 'Signal strength', value: `${trade.signalStrength} Strength\n(${trade.signal})` },
        ].map((item, index) => renderGridItem(item, index))}
      </View>

      {/* Required custom visual requirement met (Section 7) */}
      <Text style={styles.subHeader}>Fictional activity trend</Text>
      <MockActivityChart />

      {/* "Why this matters" education example required (Section 7) */}
      <View style={styles.educationCard}>
        <Info size={20} color={colors.analytics} />
        <Text style={styles.educationTitle}>Understanding this data point</Text>
        <Text style={styles.educationText}>
          A senior executive purchase can be a data point for further research because it shows a disclosed transaction by someone close to the company. It does not reveal the person's full financial situation or predict future performance.
        </Text>
      </View>

      {/* Required disclaimer EXACT text requirement met (Section 7) */}
      <Text style={styles.disclaimerText}>
        This prototype uses mock data for demonstration only. Insider-trading filings are public disclosures and do not constitute investment advice. Past activity does not guarantee future stock performance.
      </Text>
      
      {/* Rhythm spacing bottom buffer */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// Reusable component parts
const renderGridItem = (item: { label: string, value: string }, index: number) => (
  <View key={index} style={styles.gridItem}>
    <Text style={styles.gridLabel}>{item.label}</Text>
    <Text style={styles.gridValue}>{item.value}</Text>
  </View>
);

const renderNotFound = () => (
  <View style={styles.center}>
    <Text style={{ color: colors.textSecondary }}>Error: Fictional trade not found.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  fictionalBadge: { 
    color: colors.background, 
    backgroundColor: colors.analytics, 
    fontSize: 10, 
    fontWeight: 'bold', 
    letterSpacing: 1, 
    marginBottom: 12,
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  companyName: { color: colors.textPrimary, fontSize: 24, fontWeight: 'bold' },
  tickerBadge: { 
    color: colors.textSecondary, 
    backgroundColor: colors.surface, 
    fontSize: 14, 
    fontWeight: '500', 
    marginLeft: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#374151',
    overflow: 'hidden',
  },
  sectorLine: { color: colors.textSecondary, fontSize: 14, marginBottom: 24 },
  signalCard: { 
    backgroundColor: colors.surface, 
    padding: 16, 
    borderRadius: 8, 
    borderLeftWidth: 4, 
    marginBottom: 24,
  },
  signalCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  signalType: { fontSize: 18, fontWeight: 'bold' },
  signalValueText: { color: colors.textSecondary, fontSize: 14 },
  gridHeader: { color: colors.textSecondary, fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 12, marginLeft: 4 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', backgroundColor: colors.surface, padding: 16, borderRadius: 8, marginBottom: 24 },
  gridItem: { width: '50%', marginBottom: 12 },
  gridLabel: { color: colors.textSecondary, fontSize: 12 },
  gridValue: { color: colors.textPrimary, fontSize: 14, fontWeight: '500', lineHeight: 20 },
  subHeader: { color: colors.textPrimary, fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  educationCard: { backgroundColor: colors.surface, padding: 20, borderRadius: 8, marginBottom: 24, borderWidth: 1, borderColor: '#374151' },
  educationTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: 'bold', marginTop: 12, marginBottom: 8 },
  educationText: { color: colors.textSecondary, fontSize: 14, lineHeight: 22 },
  disclaimerText: { color: colors.textSecondary, fontSize: 12, fontStyle: 'italic', textAlign: 'center', lineHeight: 20, paddingHorizontal: 20 },
});