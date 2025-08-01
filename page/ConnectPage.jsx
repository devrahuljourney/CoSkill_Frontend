import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../color/color';
import PersonalMeeting from '../component/connect/PersonalMeeting';
import ShowMeeting from '../component/connect/ShowMeeting/ShowMeeting';

export default function ConnectPage() {
  const navigation = useNavigation();
  const tabs = ['Personal', 'Accepted', 'Pending', 'Rejected', 'Group'];

  const [selectedTab, setSelectedTab] = useState('Personal');
  const status = selectedTab.toLowerCase();


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>{'←'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Connect with People</Text>
      </View>

      {/* Tab bar */}
      <View style={styles.tabWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}
        >
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={[
                styles.tabButton,
                selectedTab === tab && styles.activeTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content area */}
      <View style={styles.contentArea}>
        <Text style={styles.contentText}>
          {selectedTab === 'Personal' && (<PersonalMeeting/>)}
          {selectedTab === 'Group' && 'Start or join a group meet'}
          {selectedTab === 'Accepted' && (<ShowMeeting status={status} />)}
          {selectedTab === 'Pending' && (<ShowMeeting status={status} />)}
          {selectedTab === 'Rejected' && (<ShowMeeting status={status} />)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    marginVertical:20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  backButton: {
    paddingRight: 10,
    paddingVertical: 4,
  },
  backText: {
    fontSize: 20,
    color: Colors.black,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  tabWrapper: {
    height: 50,
  },
  tabContainer: {
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  tabButton: {
    marginRight: 15,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: Colors.lightGrey,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    color: Colors.black,
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.white,
  },
  contentArea: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  contentText: {
    fontSize: 16,
    color: Colors.darkblack,
  },
});
