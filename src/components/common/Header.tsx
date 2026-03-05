import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Spacing } from '../../constants/theme';
import { RefreshTimer } from './RefreshTimer';
import { LocationPicker } from './LocationPicker';
import { useLocation } from '../../context/LocationContext';

interface HeaderProps {
  fetchedAt: number | undefined;
  onRefresh: () => void;
  isRefetching: boolean;
}

export function Header({ fetchedAt, onRefresh, isRefetching }: HeaderProps) {
  const { location, setLocation } = useLocation();
  const [pickerVisible, setPickerVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.titleRow}>
          <Ionicons name="cloud" size={22} color={Colors.primary} />
          <Text style={styles.appName}>WeatherScope</Text>
        </View>
        <TouchableOpacity
          style={styles.locationRow}
          onPress={() => setPickerVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.location}>
            {location.name}, {location.country}
          </Text>
          <Ionicons name="chevron-down" size={14} color={Colors.foregroundMuted} />
        </TouchableOpacity>
      </View>
      <RefreshTimer fetchedAt={fetchedAt} onRefresh={onRefresh} isRefetching={isRefetching} />

      <LocationPicker
        visible={pickerVisible}
        onClose={() => setPickerVisible(false)}
        currentLocation={location}
        onSelect={setLocation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  left: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  appName: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.foreground,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  location: {
    fontSize: FontSize.sm,
    color: Colors.foregroundMuted,
  },
});
