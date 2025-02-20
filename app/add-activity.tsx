// app/add-activity.tsx
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './_layout';
import { useDatabase } from '../hooks/database';
import { useState } from 'react';

const AddActivity = () => {
  const router = useRouter();
  const { addActivity } = useDatabase();
  const [steps, setSteps] = useState('');

  const handleAddActivity = async () => {
    if (steps) {
      await addActivity(parseInt(steps));
      router.back();
    }
  };

  return (
    <View style={[styles.container, styles.centerContainer]}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Add Activity</Text>
      
      <TextInput
        style={styles.input}
        value={steps}
        onChangeText={setSteps}
        placeholder="Enter Steps"
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddActivity}
      >
        <Text style={styles.buttonText}>Add activity</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddActivity;