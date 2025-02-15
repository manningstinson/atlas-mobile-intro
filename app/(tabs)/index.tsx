// app/(tabs)/index.tsx
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '../_layout';
import { useEffect, useState } from 'react';


type Activity = {
  id: number;
  steps: number;
  date: number;
};

const Index = () => {
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Initialize database and load activities
    const setup = async () => {
      await initDatabase();
      loadActivities();
    };
    setup();
  }, []);

  const loadActivities = async () => {
    try {
      const data = await getActivities();
      setActivities(data);
    } catch (error) {
      console.error('Error loading activities:', error);
    }
  };

  const renderActivity = ({ item }: { item: Activity }) => {
    const date = new Date(item.date * 1000).toLocaleString();
    return (
      <View style={styles.activityItem}>
        <Text style={styles.dateText}>{date}</Text>
        <Text style={styles.stepsText}>Steps: {item.steps}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, styles.centerContainer]}>
      <FlatList
        data={activities}
        renderItem={renderActivity}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push('/add-activity')}
      >
        <Text style={styles.buttonText}>Add activity</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;