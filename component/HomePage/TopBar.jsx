import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { logo } from '../../constant/image';
import Icon from 'react-native-vector-icons/Feather';

export default function TopBar() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={logo} />
      <TouchableOpacity style={styles.searchBtn}>
        <Icon style={styles.icon} name="search" size={22} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  image: {
    width: 110,
    height: 40,
    resizeMode: 'contain',
  },
  searchBtn: {
    padding: 10,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
  },
  icon: {
    alignSelf: 'center',
  },
});
