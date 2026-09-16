import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  title: string;
  value: string;
};

export const SummaryCard = ({ title, value }: Props) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 8,
    width: '31%', // Comfortably fits 3 per row with rhythm spacing
    borderWidth: 1,
    borderColor: '#374151',
  },
  cardTitle: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  cardValue: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    marginTop: 4,
    fontSize: 14,
  },
});