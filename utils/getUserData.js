import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserDataFromStorage = async () => {
  try {
    const storedData = await AsyncStorage.getItem('user');
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("Failed to read user from storage:", error);
    return null;
  }
};
