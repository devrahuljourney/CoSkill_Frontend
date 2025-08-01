import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DisplayMeeting() {
  const route = useRoute();
  const navigation = useNavigation();
  const { meetingUrl, title = 'Meeting' } = route.params;

  return (
    <SafeAreaView style={{flex:1}} >
        <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>

      <WebView source={{ uri: meetingUrl }} style={styles.webview} />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  webview: {
    flex: 1,
  },
});
