/**
 * Uses expo-router's Tabs component with Ionicons for tab icons
 * and custom dark theme styling.
 */

import React from "react";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, FontSize, FontWeight } from "../../src/constants/theme";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

function TabIcon({ name, focused }: { name: IoniconsName; focused: boolean }) {
  return (
    <Ionicons
      name={name}
      size={22}
      color={focused ? Colors.tabBarActive : Colors.tabBarInactive}
    />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.tabBarActive,
        tabBarInactiveTintColor: Colors.tabBarInactive,
        tabBarLabelStyle: styles.tabLabel,
        sceneStyle: { backgroundColor: "transparent" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Now",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="partly-sunny" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="hourly"
        options={{
          title: "Hourly",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="time-outline" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="wind-air"
        options={{
          title: "Wind & Air",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="compass-outline" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="forecast"
        options={{
          title: "Forecast",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="calendar-outline" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.tabBarBackground,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    height: 85,
    paddingBottom: 20,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },
});
