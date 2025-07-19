import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useProtector() {
  const token = useSelector((state) => state.userData.token); 

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const syncUser = async () => {
      setLoading(true);
      try {
        if (token) {
          const userData = await AsyncStorage.getItem('user');
          const parsedUser = JSON.parse(userData);
          setRole(parsedUser?.role || null);
          setIsAuthenticated(true);
        } else {
          setRole(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.log('Error reading user:', err);
        setRole(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    syncUser();
  }, [token]); 

  return { loading, isAuthenticated, role };
}
