// hooks/database.ts
import { openDatabase, SQLTransaction, SQLResultSet } from 'expo-sqlite';
import { useState, useEffect } from 'react';

const db = openDatabase('activities.db');

export interface Activity {
  id: number;
  steps: number;
  date: number;
}

// Database operations
const dbOperations = {
  init: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx: SQLTransaction) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS activities (id INTEGER PRIMARY KEY AUTOINCREMENT, steps INTEGER, date INTEGER);',
          [],
          (_, result: SQLResultSet) => {
            resolve('Database initialized');
          },
          (_, error): boolean => {
            reject(error);
            return false;
          }
        );
      });
    });
  },

  addActivity: (steps: number) => {
    return new Promise((resolve, reject) => {
      const date = Math.floor(Date.now() / 1000);
      db.transaction((tx: SQLTransaction) => {
        tx.executeSql(
          'INSERT INTO activities (steps, date) VALUES (?, ?);',
          [steps, date],
          (_, result: SQLResultSet) => resolve(result),
          (_, error): boolean => {
            reject(error);
            return false;
          }
        );
      });
    });
  },

  getActivities: () => {
    return new Promise<Activity[]>((resolve, reject) => {
      db.transaction((tx: SQLTransaction) => {
        tx.executeSql(
          'SELECT * FROM activities ORDER BY date DESC;',
          [],
          (_, { rows: { _array } }) => resolve(_array as Activity[]),
          (_, error): boolean => {
            reject(error);
            return false;
          }
        );
      });
    });
  },

  deleteActivity: (id: number) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx: SQLTransaction) => {
        tx.executeSql(
          'DELETE FROM activities WHERE id = ?;',
          [id],
          (_, result: SQLResultSet) => resolve(result),
          (_, error): boolean => {
            reject(error);
            return false;
          }
        );
      });
    });
  },

  deleteAllActivities: () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx: SQLTransaction) => {
        tx.executeSql(
          'DELETE FROM activities;',
          [],
          (_, result: SQLResultSet) => resolve(result),
          (_, error): boolean => {
            reject(error);
            return false;
          }
        );
      });
    });
  }
};

// Hook for using database operations
export function useDatabase() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    dbOperations.init()
      .then(() => setIsInitialized(true))
      .catch(err => setError(err));
  }, []);

  return {
    isInitialized,
    error,
    addActivity: dbOperations.addActivity,
    getActivities: dbOperations.getActivities,
    deleteActivity: dbOperations.deleteActivity,
    deleteAllActivities: dbOperations.deleteAllActivities
  };
}