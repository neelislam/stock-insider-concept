import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../types/trade';

import HomeScreen from '../screens/HomeScreen';
import ScreenerScreen from '../screens/ScreenerScreen';
import TradeDetailsScreen from '../screens/TradeDetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Define screenOptions based on design system and accessibility (Section 10).
const defaultOptions = {
  headerStyle: { backgroundColor: colors.background },
  headerTintColor: colors.textPrimary,
  headerTitleStyle: { fontWeight: 'bold' as const, fontSize: 18 },
  headerShadowVisible: false,
};

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={defaultOptions} initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={({ navigation }) => ({
          title: 'Market Pulse',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Screener')} accessibilityLabel="Open Search Screener">
              <Search color={colors.textPrimary} size={22} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="Screener" component={ScreenerScreen} options={{ title: 'Screener' }} />
      <Stack.Screen name="Details" component={TradeDetailsScreen} options={{ title: 'Trade Details' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;