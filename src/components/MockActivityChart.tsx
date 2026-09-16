import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

// A fixed seven-day visual visualization built from unique numeric arrays (Section 7).
// Labeled "Mock 7-day activity" so it cannot be mistaken for live market information.
export const MockActivityChart = () => {
  const fictionalHeights = [40, 75, 55, 90, 65, 30, 85];

  return (
    <View style={styles.container}>
      {fictionalHeights.map((height, index) => (
        <View key={index} style={styles.barWrapper}>
          <View style={[styles.bar, { height }]} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 8,
    height: 140, // Chart area height
    borderWidth: 1,
    borderColor: '#374151',
    marginBottom: 24,
  },
  barWrapper: {
    height: 100, // Maximum potential bar height
    justifyContent: 'flex-end',
    width: '10%',
  },
  bar: {
    backgroundColor: colors.analytics,
    width: '100%',
    borderRadius: 4,
  },
});