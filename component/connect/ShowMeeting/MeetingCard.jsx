import { View, Text, StyleSheet, Image, Linking, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getUserDataFromStorage } from '../../../utils/getUserData';
import { Colors } from '../../../color/color';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../../slices/loaderSlice';
import { acceptMeeting, rejectMeeting } from '../../../services/operations/personalMeetingAPI';
import * as WebBrowser from 'expo-web-browser';
export default function MeetingCard({ meeting, status, onAction }) {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const host = meeting?.hostUser || {};

  const date = meeting?.date ? new Date(meeting.date).toDateString() : 'Not set';
  const time = meeting?.time || 'Not set';
  const duration = meeting?.duration || 30;
  const senderMessage = meeting?.senderMessage || 'No message';
  const rejectionMessage = meeting?.rejectionMessage || null;
  const meetingLink = meeting?.meetingLink || null;
  const city = host?.city || 'Unknown';
  const state = host?.state || '';
  const name = host?.firstName || 'Unknown';
  const email = host?.email || 'Not provided';

  const profilePic =
    host?.profilePic?.trim() && !host.profilePic.includes('multiavatar')
      ? encodeURI(host.profilePic.trim().replace(/\s/g, ''))
      : `https://api.dicebear.com/7.x/avataaars/png?seed=${(host?.firstName || 'host').replace(/\s/g, '')}`;

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserDataFromStorage();
      setUser(data);
    };
    fetchUser();
  }, []);

  const navigate = useNavigation();
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.userData);


  const handleJoin = () => {
    // navigate.navigate("DisplayMeeting", {meetingUrl : meetingLink})
    // Linking.openURL(meetingLink);
    WebBrowser.openBrowserAsync(meetingLink);
  };

  const handleAccept = async() => {
    // Alert.alert('Accepted', 'You accepted the meeting.');
    dispatch(showLoader());
    const res =await acceptMeeting(meeting._id,token);
    dispatch(hideLoader())
    onAction()
  };

  const handleReject = async() => {
    if (!message.trim()) return Alert.alert('Message required', 'Please enter a rejection message');
    // Alert.alert('Rejected', `Meeting rejected with message: ${message}`);
    dispatch(showLoader());
    const res =await rejectMeeting(meeting._id,message,token);
    dispatch(hideLoader())
    onAction()

  };

  const handleCancel = async() => {
    if (!message.trim()) return Alert.alert('Message required', 'Please enter a cancellation message');
    Alert.alert('Cancelled', `Meeting cancelled with message: ${message}`);
    dispatch(showLoader());
    const res =await rejectMeeting(meeting._id,message,token);
    dispatch(hideLoader())
    onAction()

  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={{ uri: profilePic }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
          <Text style={styles.location}>{city}, {state}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <Text>Date: {date}</Text>
        <Text>Time: {time}</Text>
        <Text>Duration: {duration} min</Text>
        <Text>Status: {status || 'pending'}</Text>
        <Text>Sender Message: {senderMessage}</Text>

        {status === 'rejected' && rejectionMessage && (
          <Text>Rejection Reason: {rejectionMessage}</Text>
        )}

        {status === "accepted" && meetingLink && (
          <TouchableOpacity style={styles.joinBtn} onPress={handleJoin}>
            <Text style={styles.btnText}>Join Meeting</Text>
          </TouchableOpacity>
        )}

        {status === "pending" && user && host && (
  <>
    {user._id === host._id ? (
      <>
        <TextInput
          placeholder="Enter rejection message..."
          placeholderTextColor="#999"
          style={styles.input}
          value={message}
          onChangeText={setMessage}
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.acceptBtn} onPress={handleAccept}>
            <Text style={styles.btnText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectBtn} onPress={handleReject}>
            <Text style={styles.btnText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </>
    ) : (
      <>
        <TextInput
          placeholder="Enter cancellation message..."
          placeholderTextColor="#999"
          style={styles.input}
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
      </>
    )}
  </>
)}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 16,
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.lightGrey,
  },
  info: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
  email: {
    color: Colors.grey,
  },
  location: {
    color: Colors.grey,
  },
  details: {
    marginTop: 8,
  },
  joinBtn: {
    backgroundColor: Colors.primary,
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  acceptBtn: {
    backgroundColor: Colors.primary,
    flex: 1,
    marginRight: 6,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    color:Colors.white
  },
  rejectBtn: {
    backgroundColor: Colors.error,
    flex: 1,
    marginLeft: 6,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: Colors.warning,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: Colors.white,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 10,
    color: Colors.black,
  },
});
