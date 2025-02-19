// components/DatabaseTest.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDatabase } from '../hooks/database';

export function DatabaseTest() {
  const { addActivity, getActivities } = useDatabase();

  const testAddActivity = async () => {
    try {
      await addActivity(1000); // Test adding 1000 steps
      console.log('Test activity added');
      
      // Try to get all activities
      const activities = await getActivities();
      console.log('Current activities:', activities);
    } catch (err) {
      console.error('Test error:', err);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Database Test</Text>
      <Button 
        title="Add Test Activity" 
        onPress={testAddActivity} 
      />
    </View>
  );
}

export default DatabaseTest;