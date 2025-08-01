import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors } from '../../color/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../slices/loaderSlice';
import { getBookedSlot, requestMeeting } from '../../services/operations/personalMeetingAPI';
import { getUserDataFromStorage } from '../../utils/getUserData';

export default function CalendarScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const routes = useRoute();
  const { userId } = routes.params;
  const { token } = useSelector((state) => state.userData);

  const availableSlot = [
    { start: '10:00', end: '10:30' },
    { start: '11:00', end: '11:30' },
    { start: '12:00', end: '12:30' },
    { start: '14:00', end: '14:30' },
    { start: '15:00', end: '15:30' },
  ];

  const today = new Date().toISOString().split('T')[0];

  const [bookedSlot, setBookedSlot] = useState([]);
  const [selected, setSelected] = useState(today);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [message, setMessage] = useState('');

  const getBookedTime = async (dateToFetch = selected) => {
    dispatch(showLoader());
    const res = await getBookedSlot(dateToFetch, userId, token);
    if (res?.bookedSlots) {
      setBookedSlot(res.bookedSlots);
    } else {
      setBookedSlot([]);
    }
    dispatch(hideLoader());
  };

  const filteredSlots = availableSlot.filter(
    slot => !bookedSlot.some(b => b === slot.start)
  );

  const handleRequest = async () => {
    if (!selected || !selectedSlot || !message.trim()) {
      Alert.alert('Missing Info', 'Please select date, time, and enter message.');
      return;
    }

    const getCurrentUser = await getUserDataFromStorage();

    dispatch(showLoader());
    await requestMeeting(
      userId,
      getCurrentUser._id,
      selected,
      selectedSlot,
      message,
      token
    );
    setMessage('');
    setSelectedSlot(null);
    await getBookedTime();
    dispatch(hideLoader());
    Alert.alert('Requested', 'Meeting request sent!');
  };

  useEffect(() => {
    getBookedTime(today); 
  }, []);

  useEffect(() => {
    if (selected) {
      getBookedTime(selected);
    }
  }, [selected]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flex: 1 }}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.heading}>Select Date & Available Time</Text>

          <Calendar
            onDayPress={day => {
              setSelected(day.dateString);
              setSelectedSlot(null); 
            }}
            markedDates={{
              [selected]: {
                selected: true,
                selectedColor: Colors.primary,
                selectedTextColor: '#fff',
              },
            }}
            minDate={today}
            style={styles.calendar}
          />

          <View style={styles.slotContainer}>
            <Text style={styles.slotHeading}>Available Slots:</Text>
            {filteredSlots.length === 0 ? (
              <Text style={styles.noSlot}>No Slots Available</Text>
            ) : (
              filteredSlots.map((slot, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setSelectedSlot(slot)}
                  style={[
                    styles.slotBtn,
                    selectedSlot?.start === slot.start && styles.slotBtnSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.slotText,
                      selectedSlot?.start === slot.start && styles.slotTextSelected,
                    ]}
                  >
                    {slot.start} - {slot.end}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </View>

          <TextInput
            placeholder="Add a message for the user..."
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            style={styles.messageBox}
          />

          <TouchableOpacity
            style={[
              styles.requestBtn,
              filteredSlots.length === 0 && { backgroundColor: '#ccc' },
            ]}
            onPress={handleRequest}
            disabled={filteredSlots.length === 0}
          >
            <Text style={styles.requestBtnText}>Request Meeting</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  backBtn: {
    marginBottom: 10,
  },
  backBtnText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 18,
    color: Colors.black,
    marginBottom: 12,
    fontWeight: '600',
  },
  calendar: {
    borderRadius: 10,
    marginBottom: 20,
  },
  slotContainer: {
    marginTop: 10,
    padding: 12,
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
  },
  slotHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.black,
  },
  slotBtn: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginBottom: 10,
  },
  slotBtnSelected: {
    backgroundColor: Colors.primary,
  },
  slotText: {
    fontSize: 16,
    color: Colors.darkblack,
    textAlign: 'center',
  },
  slotTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  noSlot: {
    fontSize: 16,
    color: Colors.grey,
    fontStyle: 'italic',
  },
  messageBox: {
    marginTop: 20,
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    textAlignVertical: 'top',
    color: Colors.black,
  },
  requestBtn: {
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  requestBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
