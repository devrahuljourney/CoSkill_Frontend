import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ConnectionCard from '../component/MatchPage/ConnectionCard';
import {
  acceptUser,
  getAllRequest,
  removeUserRequest,
} from '../services/operations/connectionAPI';
import { useSelector } from 'react-redux';
import { Colors } from '../color/color';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MatchPage() {
  const [activeTab, setActiveTab] = useState('sent');
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);
  const { token } = useSelector((state) => state.userData);
  const navigation = useNavigation();

  const getRequests = async () => {
    try {
      const res = await getAllRequest(token);
      setSent(res?.data?.sentRequests || []);
      setReceived(res?.data?.receivedRequests || []);
    } catch (err) {
      console.log('Fetch error:', err.message);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      await acceptUser(id, token);
      setReceived((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      console.log('Accept error:', err.message);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeUserRequest(id, token);
      if (activeTab === 'sent') {
        setSent((prev) => prev.filter((user) => user._id !== id));
      } else {
        setReceived((prev) => prev.filter((user) => user._id !== id));
      }
    } catch (err) {
      console.log('Remove error:', err.message);
    }
  };

  const dataToRender = activeTab === 'sent' ? sent : received;

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.title}>Exchange Requests</Text>
        <View style={{ width: 24 }} /> {/* Placeholder for alignment */}
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'sent' && styles.activeTab]}
          onPress={() => setActiveTab('sent')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'sent' && styles.activeTabText,
            ]}
          >
            Sent
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'received' && styles.activeTab]}
          onPress={() => setActiveTab('received')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'received' && styles.activeTabText,
            ]}
          >
            Received
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {dataToRender.length === 0 ? (
          <Text style={styles.noDataText}>No connections found</Text>
        ) : (
          dataToRender.map((user) => (
            <ConnectionCard
              key={user._id}
              user={user}
              type={activeTab}
              onAccept={handleAccept}
              onRemove={handleRemove}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.softLavender,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGrey,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: Colors.lightGrey,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.grey,
  },
  activeTabText: {
    color: Colors.white,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: Colors.grey,
  },
});
