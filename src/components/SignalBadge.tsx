import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  strength: "High" | "Medium" | "Low";
};

export const SignalBadge = ({ strength }: Props) => {
  let badgeColor = colors.analytics;
  if (strength === "High") badgeColor = colors.purchase;
  if (strength === "Low") badgeColor = colors.sale;

  return (
    <View style={[styles.badge, { borderColor: badgeColor }]}>
      <Text style={[styles.label, { color: badgeColor }]}>{strength} Strength</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});