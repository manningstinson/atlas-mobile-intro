// hooks/database.ts
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';

// Open the database asynchronously
async function openDatabase() {
  return await SQLite.openDatabaseAsync('activities.db');
}

// Interface for Activity
export interface Activity {
  id: number;
  steps: number;
  date: number;
}

// Database operations
const dbOperations = {
  init: async () => {
    try {
      const db = await openDatabase();
      await db.execAsync(
        'CREATE TABLE IF NOT EXISTS activities (id INTEGER PRIMARY KEY AUTOINCREMENT, steps INTEGER, date INTEGER);'
      );
      console.log('Database initialized');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  },

  addActivity = async (steps: number) => {
  try {
    const db = await openDatabase();
    const date = Math.floor(Date.now() / 1000);
    await db.execAsync(
      'INSERT INTO activities (steps, date) VALUES (?, ?);',
      [steps, date]
    );
    console.log('Activity added');
  } catch (error) {
    console.error('Error adding activity:', error);
    throw error;
  }
},

  getActivities: async (): Promise<Activity[]> => {
    try {
      const db = await openDatabase();
      const result = await db.getAllAsync('SELECT * FROM activities ORDER BY date DESC;');
      return result as Activity[];
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw error;
    }
  },

  deleteActivity: async (id: number) => {
    try {
      const db = await openDatabase();
      const result = await db.execAsync(
        'DELETE FROM activities WHERE id = ?;',
        [id]
      );
      console.log('Activity deleted');
      return result;
    } catch (error) {
      console.error('Error deleting activity:', error);
      throw error;
    }
  },

  deleteAllActivities: async () => {
    try {
      const db = await openDatabase();
      const result = await db.execAsync('DELETE FROM activities;');
      console.log('All activities deleted');
      return result;
    } catch (error) {
      console.error('Error deleting all activities:', error);
      throw error;
    }
  },
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
    deleteAllActivities: dbOperations.deleteAllActivities,
  };
}