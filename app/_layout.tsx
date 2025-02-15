// app/_layout.tsx
import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';

const RootLayout = () => {
  return (
    <View style={styles.container}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="add-activity"
          options={{
            presentation: 'modal',
            title: 'Add Activity'
          }}
        />
      </Stack>
    </View>
  );
};

export const styles = StyleSheet.create({  // Added 'export' here
  container: {
    flex: 1,
    backgroundColor: 'beige', // Beige background color
  },
});

export default RootLayout;