// hooks/database.ts
import { openDatabase } from 'expo-sqlite';
import { useState, useEffect } from 'react';

export interface Activity {
  id: number;
  steps: number;
  date: number;
}

export function useDatabase() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const db = openDatabase('activities.db');

  // Initialize database when the hook is first used
  useEffect(() => {
    const initDatabase = () => {
      try {
        db.transaction(tx => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS activities (id INTEGER PRIMARY KEY AUTOINCREMENT, steps INTEGER, date INTEGER);',
            [],
            () => {
              setIsInitialized(true);
            },
            (_, error) => {
              setError(error);
              return false;
            }
          );
        });
      } catch (err) {
        setError(err as Error);
      }
    };

    initDatabase();
  }, []);

  const addActivity = async (steps: number) => {
    try {
      const date = Math.floor(Date.now() / 1000);
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO activities (steps, date) VALUES (?, ?);',
            [steps, date],
            (_, result) => resolve(result),
            (_, error) => {
              reject(error);
              return false;
            }
          );
        });
      });
    } catch (error) {
      console.error('Error adding activity:', error);
      throw error;
    }
  };

  return {
    isInitialized,
    error,
    addActivity,
    // ... other database operations
  };
}

export default useDatabase;