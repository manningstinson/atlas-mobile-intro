// app/_layout.tsx
import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import DatabaseProvider from '../components/DatabaseProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
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
  // Activity card styles
  activityCard: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  stepsText: {
    fontSize: 18,
    fontWeight: 'bold',
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
  deleteButton: {
    backgroundColor: '#DC143C',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '100%',
  },
  deleteAllButton: {
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
    fontWeight: 'bold',
  },
  // Input styles
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 15,
    width: '100%',
    marginBottom: 20,
    fontSize: 16,
  },
  // Header styles
  header: {
    backgroundColor: '#fff',
  },
  tabBar: {
    backgroundColor: '#fff',
  },
  // Bottom container style
  bottomContainer: {
    padding: 20,
  }
});

export default RootLayout;