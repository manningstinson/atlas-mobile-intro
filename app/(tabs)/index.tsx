// app/(tabs)/index.tsx
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '../_layout';

const Index = () => {
  const router = useRouter();

  return (
    <View style={[styles.container, styles.centerContainer]}>
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