// app/_layout.tsx
import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import DatabaseProvider from '../components/db_provider';

const RootLayout = () => {
  return (
    <DatabaseProvider>
      <View style={styles.container}>
        <Stack>
          <Stack.Screen 
            name="(tabs)" 
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="add-activity"
            options={{
              presentation: 'modal',
              title: 'Add Activity',
              headerBackVisible: false,
            }}
          />
        </Stack>
      </View>
    </DatabaseProvider>
  );
};

export const styles = StyleSheet.create({
  // Base container style
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC', // Beige background color
  },
  // Center container style
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  // Button styles
  addButton: {
    backgroundColor: '#00CED1', // Turquoise color
    width: '100%',
    padding: 15,
    borderRadius: 5,
  },
  backButton: {
    backgroundColor: '#DC143C', // Red color
    width: '100%',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  // Header styles
  header: {
    backgroundColor: '#fff',
  },
  tabBar: {
    backgroundColor: '#fff',
  }
});

export default RootLayout;