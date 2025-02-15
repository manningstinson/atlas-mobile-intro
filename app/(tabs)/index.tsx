// app/(tabs)/index.tsx
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { styles as rootStyles } from '../_layout';

const Index = () => {
  const router = useRouter();

  return (
    <View style={rootStyles.container}>
      <TouchableOpacity 
        onPress={() => router.push('/add-activity')}
      >
        <Text>Add activity</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;