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
            title: 'Add Activity',
            headerBackVisible: false,
          }}
        />
      </Stack>
    </View>
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
    backgroundColor: '#1ED2AF', // Turquoise color
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
  },
 activityItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  dateText: {
    fontSize: 14,
    color: '#888',
  },
  stepsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  
});

export default RootLayout;