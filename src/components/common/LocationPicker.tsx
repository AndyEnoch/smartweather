/**
 * Location picker — modal bottom sheet for switching cities.
 *
 * Displays a list of preset locations. The active location
 * is highlighted. Selecting a location updates the global
 * context and dismisses the modal.
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, FontSize, FontWeight, Spacing } from '../../constants/theme';
import { LOCATIONS, type Location } from '../../constants/weather';

interface LocationPickerProps {
  visible: boolean;
  onClose: () => void;
  currentLocation: Location;
  onSelect: (location: Location) => void;
}

export function LocationPicker({ visible, onClose, currentLocation, onSelect }: LocationPickerProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          <View style={styles.handle} />
          <Text style={styles.title}>Select Location</Text>
          <Text style={styles.subtitle}>Choose a city to view weather</Text>

          <View style={styles.list}>
            {LOCATIONS.map((loc) => {
              const isActive =
                loc.latitude === currentLocation.latitude &&
                loc.longitude === currentLocation.longitude;
              return (
                <TouchableOpacity
                  key={`${loc.latitude}-${loc.longitude}`}
                  style={[styles.item, isActive && styles.itemActive]}
                  onPress={() => {
                    onSelect(loc);
                    onClose();
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.itemLeft}>
                    <Ionicons
                      name="location"
                      size={18}
                      color={isActive ? Colors.primary : Colors.foregroundMuted}
                    />
                    <View>
                      <Text style={[styles.cityName, isActive && styles.cityNameActive]}>
                        {loc.name}
                      </Text>
                      <Text style={styles.country}>{loc.country}</Text>
                    </View>
                  </View>
                  {isActive && (
                    <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Spacing.xxl,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.foregroundMuted,
    alignSelf: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.foreground,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.foregroundMuted,
    marginTop: 4,
    marginBottom: Spacing.xl,
  },
  list: {
    gap: Spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  itemActive: {
    backgroundColor: 'rgba(74, 108, 247, 0.12)',
    borderColor: Colors.primary,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  cityName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.foreground,
  },
  cityNameActive: {
    color: Colors.primary,
  },
  country: {
    fontSize: FontSize.xs,
    color: Colors.foregroundMuted,
    marginTop: 2,
  },
});
