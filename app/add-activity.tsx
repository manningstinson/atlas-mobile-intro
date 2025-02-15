// app/add-activity.tsx
import { View, Text } from 'react-native';
import { styles as rootStyles } from './_layout';  // Note the ./ instead of ../ since we're in the same directory

const AddActivity = () => {
  return (
    <View style={rootStyles.container}>
      <Text>Add Activity Screen</Text>
    </View>
  );
};

export default AddActivity;