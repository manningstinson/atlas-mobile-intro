import React from 'react';
import { View, Text } from 'react-native';
import { useDatabase } from '../hooks/database';

interface DatabaseProviderProps {
  children: React.ReactNode;
}

export function DatabaseProvider({ children }: DatabaseProviderProps) {
  const { isInitialized, error } = useDatabase();

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Database Error: {error.message}</Text>
      </View>
    );
  }

  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Initializing database...</Text>
      </View>
    );
  }

  return <>{children}</>;
}

export default DatabaseProvider;