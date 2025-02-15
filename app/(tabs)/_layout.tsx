// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

const TabLayout = () => {
  return (
    <Tabs 
      screenOptions={{
        headerShown: true,
        tabBarStyle: styles.tabBar,
        headerStyle: styles.header,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
  },
});

export default TabLayout;