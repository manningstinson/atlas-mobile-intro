// app/(tabs)/database-test.tsx
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useDatabase } from '../hooks/database';
import { useEffect, useState } from 'react';
import { styles } from '../app/_layout';
import { Activity } from '../hooks/database';

const DatabaseTest = () => {
  const { addActivity, getActivities, deleteAllActivities } = useDatabase();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [steps, setSteps] = useState('');

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const result = await getActivities();
      setActivities(result);
      console.log('Activities loaded:', result);
    } catch (err) {
      console.error('Error loading activities:', err);
    }
  };

  const handleAddActivity = async () => {
    if (!steps) {
      console.log('Please enter number of steps');
      return;
    }
    try {
      await addActivity(parseInt(steps));
      setSteps(''); // Clear input after adding
      console.log('Activity added with steps:', steps);
      await loadActivities(); // Refresh the list
    } catch (err) {
      console.error('Error adding activity:', err);
    }
  };

  const handleClearAll = async () => {
    try {
      await deleteAllActivities();
      console.log('All activities cleared');
      await loadActivities(); // Refresh the list
    } catch (err) {
      console.error('Error clearing activities:', err);
    }
  };

  return (
    <View style={[styles.container]}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Database Test Page</Text>
      
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
            width: '100%'
          }}
          value={steps}
          onChangeText={setSteps}
          placeholder="Enter number of steps"
          keyboardType="numeric"
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddActivity}
        >
          <Text style={styles.buttonText}>Add Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: 'red' }]}
          onPress={handleClearAll}
        >
          <Text style={styles.buttonText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Activities ({activities.length}):
        </Text>
        {activities.map((activity) => (
          <View 
            key={activity.id} 
            style={{
              padding: 10,
              marginBottom: 10,
              backgroundColor: '#f0f0f0',
              borderRadius: 5
            }}
          >
            <Text>ID: {activity.id}</Text>
            <Text>Steps: {activity.steps}</Text>
            <Text>Date: {new Date(activity.date * 1000).toLocaleString()}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DatabaseTest;