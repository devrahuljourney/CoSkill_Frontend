import { View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setToken } from '../../slices/userData';


export default function DevToolsScreen() {

  const dispatch = useDispatch();

const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    dispatch(setToken(null))
    console.log('✅ Storage cleared');
  } catch (e) {
    console.log('❌ Failed to clear storage', e);
  }
};

  return (
    <View style={{ marginTop: 50 }}>
      <Button title="Clear AsyncStorage" onPress={clearStorage} />
    </View>
  );
}
