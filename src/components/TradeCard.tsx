import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react-native';
import { InsiderTrade } from '../types/trade';
import { colors } from '../theme/colors';
import { formatMillionValue } from '../utils/formatters';
import { SignalBadge } from './SignalBadge';

type Props = {
  trade: InsiderTrade;
  onPress: () => void;
};

export const TradeCard = ({ trade, onPress }: Props) => {
  const isPurchase = trade.type === 'purchase';
  const tradeColor = isPurchase ? colors.purchase : colors.sale;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.topRow}>
        <Text style={styles.ticker}>{trade.ticker} <Text style={styles.company}>- {trade.company}</Text></Text>
        <SignalBadge strength={trade.signalStrength} />
      </View>
      
      <View style={styles.midRow}>
        <View style={styles.typeGroup}>
          {isPurchase ? <ArrowUpRight size={16} color={colors.purchase} /> : <ArrowDownRight size={16} color={colors.sale} />}
          <Text style={[styles.tradeType, { color: tradeColor }]}>
            {isPurchase ? 'Purchase' : 'Sale'}
          </Text>
        </View>
        <Text style={[styles.tradeValue, { color: tradeColor }]}>{formatMillionValue(trade.value)}</Text>
      </View>

      <Text style={styles.roleLine}>
        {trade.insider} ({trade.role}) • Filed {trade.filedAt}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12, // 12px rhythm spacing
    borderWidth: 1,
    borderColor: '#374151',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ticker: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 16,
    maxWidth: '60%',
  },
  company: {
    color: colors.textSecondary,
    fontWeight: 'normal',
    fontSize: 14,
  },
  midRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tradeType: {
    fontWeight: 'bold',
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  tradeValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  roleLine: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});