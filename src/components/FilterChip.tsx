import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

export const FilterChip = ({ label, isActive, onPress }: Props) => (
  <TouchableOpacity 
    style={[styles.chip, isActive && styles.chipActive]} 
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.surface,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  chipActive: {
    backgroundColor: colors.analytics,
    borderColor: colors.analytics,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  labelActive: {
    color: colors.background, // Contrast on selected chip
    fontWeight: 'bold',
  },
});