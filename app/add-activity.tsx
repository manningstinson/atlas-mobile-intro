// app/add-activity.tsx
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './_layout';

const AddActivity = () => {
  const router = useRouter();

  return (
    <View style={[styles.container, styles.centerContainer]}>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => {
          // Add your activity logic here
          router.back();
        }}
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