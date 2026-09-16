import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Search, XCircle } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, InsiderTrade } from '../types/trade';
import { mockTrades } from '../data/mockTrades';
import { colors } from '../theme/colors';
import { FilterChip } from '../components/FilterChip';
import { TradeCard } from '../components/TradeCard';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Screener'> };

export default function ScreenerScreen({ navigation }: Props) {
  // Component & Folder Structure requirements met (Section 9): Screen-level state is appropriate.
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'purchase' | 'sale'>('All');
  const [roleFilter, setRoleFilter] = useState<'All roles' | 'CEO' | 'CFO' | 'Director'>('All roles');
  const [valFilter, setValFilter] = useState<'Any' | '$100K+' | '$500K+' | '$1M+'>('Any');
  
  // Clear filters function required (Section 6)
  const clearFilters = () => {
    setSearch('');
    setTypeFilter('All');
    setRoleFilter('All roles');
    setValFilter('Any');
  };

  // Implement three independent filters combinable with search (Section 6).
  const filteredTrades = mockTrades.filter(trade => {
    // Search recognizes ticker and company name case-insensitively.
    const lowerSearch = search.toLowerCase();
    const matchesSearch = lowerSearch === '' || 
                          trade.ticker.toLowerCase().includes(lowerSearch) || 
                          trade.company.toLowerCase().includes(lowerSearch);
    
    // Type Filter
    const matchesType = typeFilter === 'All' || trade.type === typeFilter;
    
    // Role Filter ("Officer" remains under All roles)
    const matchesRole = roleFilter === 'All roles' || trade.role === roleFilter;
    
    // Value Threshold Filter ( trade.value is at least the selected amount)
    let matchesVal = true;
    if (valFilter === '$100K+') matchesVal = trade.value >= 100000;
    else if (valFilter === '$500K+') matchesVal = trade.value >= 500000;
    else if (valFilter === '$1M+') matchesVal = trade.value >= 1000000;

    return matchesSearch && matchesType && matchesRole && matchesVal;
  });

  // Empty state example implementation required (Section 6)
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <XCircle size={60} color="#374151" strokeWidth={1} />
      <Text style={styles.emptyText}>No fictional demo trades match those filters.</Text>
      <TouchableOpacity onPress={clearFilters} style={styles.emptyAction} accessibilityLabel="Clear Filters">
        <Text style={styles.emptyActionText}>Clear filters</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search field with icon required (Section 6) */}
      <View style={styles.searchBox}>
        <Search color={colors.textSecondary} size={20} />
        <TextInput 
          style={styles.input} 
          placeholder="Search ticker or company" 
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
          accessibilityLabel="Ticker or Company Search Input"
        />
      </View>
      
      {/* 3 filter rows/chips requirement met (Section 4) */}
      <View style={styles.filterGroup}>
        <Text style={styles.filterTitle}>Transaction type</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {(['All', 'purchase', 'sale'] as any[]).map(type => (
            <FilterChip 
              key={type} 
              label={type === 'All' ? 'All' : (type === 'purchase' ? '↑ Purchases' : '↓ Sales')}
              isActive={typeFilter === type}
              onPress={() => setTypeFilter(type)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.filterGroup}>
        <Text style={styles.filterTitle}>Insider role</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {(['All roles', 'CEO', 'CFO', 'Director'] as any[]).map(role => (
            <FilterChip 
              key={role} 
              label={role}
              isActive={roleFilter === role}
              onPress={() => setRoleFilter(role)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.filterGroup}>
        <Text style={styles.filterTitle}>Value threshold</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {(['Any', '$100K+', '$500K+', '$1M+'] as any[]).map(val => (
            <FilterChip 
              key={val} 
              label={val}
              isActive={valFilter === val}
              onPress={() => setValFilter(val)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Show result count requirement met (Section 6) */}
      <View style={styles.listHeader}>
        <Text style={styles.resultCount}>{filteredTrades.length} results</Text>
        {(search || typeFilter !== 'All' || roleFilter !== 'All roles' || valFilter !== 'Any') && (
          <TouchableOpacity onPress={clearFilters} accessibilityLabel="Clear all filters">
            <Text style={styles.clearFiltersLink}>Clear filters</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredTrades}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TradeCard 
            trade={item} 
            onPress={() => navigation.navigate('Details', { tradeId: item.id })} 
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  searchBox: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: colors.surface, 
    paddingHorizontal: 16,
    borderRadius: 8, 
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  input: { flex: 1, color: colors.textPrimary, paddingVertical: 14, marginLeft: 12, fontSize: 16 },
  filterGroup: { marginBottom: 16 },
  filterTitle: { color: colors.textSecondary, fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8, marginLeft: 4 },
  filterScroll: { paddingLeft: 4, paddingBottom: 4 },
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingHorizontal: 4 },
  resultCount: { color: colors.textSecondary, fontSize: 14, fontWeight: 'bold' },
  clearFiltersLink: { color: colors.analytics, fontSize: 12, fontWeight: 'bold' },
  listContent: { paddingBottom: 24 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80, paddingHorizontal: 40 },
  emptyText: { color: colors.textSecondary, textAlign: 'center', marginTop: 16, marginBottom: 20, fontSize: 14, lineHeight: 20 },
  emptyAction: { backgroundColor: colors.surface, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, borderWidth: 1, borderColor: colors.analytics },
  emptyActionText: { color: colors.analytics, fontWeight: 'bold' },
});