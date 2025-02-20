// app/(tabs)/index.tsx
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '../_layout';
import { useDatabase, Activity } from '../../hooks/database';
import { useEffect, useState } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const Index = () => {
  const router = useRouter();
  const { getActivities, deleteActivity, deleteAllActivities } = useDatabase();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      console.log('Loading activities...');
      const data = await getActivities();
      console.log('Received data:', data);
      setActivities(data);
    } catch (error) {
      console.error('Error loading activities:', error);
    }
  };

  const formatDate = (timestamp: number) => {
    if (!timestamp) return 'No date';
    try {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const renderRightActions = (_: any, __: any, id: number) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={async () => {
        try {
          await deleteActivity(id);
          await loadActivities();
        } catch (error) {
          console.error('Error deleting activity:', error);
        }
      }}
    >
      <Text style={styles.buttonText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {activities && activities.length > 0 ? (
          activities.map((activity) => (
            <Swipeable
              key={activity.id}
              renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX, activity.id)
              }
            >
              <View style={styles.activityCard}>
                <Text style={styles.dateText}>
                  {formatDate(activity.date)}
                </Text>
                <Text style={styles.stepsText}>
                  Steps: {activity.steps || 0}
                </Text>
              </View>
            </Swipeable>
          ))
        ) : (
          <View style={[styles.centerContainer, { marginTop: 20 }]}>
            <Text>No activities yet</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/add-activity')}
        >
          <Text style={styles.buttonText}>Add activity</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteAllButton}
          onPress={async () => {
            try {
              await deleteAllActivities();
              await loadActivities();
            } catch (error) {
              console.error('Error deleting all activities:', error);
            }
          }}
        >
          <Text style={styles.buttonText}>Delete all activities</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;