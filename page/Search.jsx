import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import Icon from 'react-native-vector-icons/Feather';
  import { useNavigation } from '@react-navigation/native';
  import { Colors } from '../color/color';
  import { useDispatch, useSelector } from 'react-redux';
  import { hideLoader, showLoader } from '../slices/loaderSlice';
  import { getBestUser, getBestSearh } from '../services/operations/userAPI';
  import UserRequestCard from '../component/common/UserRequestCard';
  
  export default function Search() {
    const navigation = useNavigation();
    const [searchResult, setSearchResult] = useState('');
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.userData);
  
    // Get best matches initially
    const bestMatch = async () => {
      dispatch(showLoader());
      const res = await getBestUser(token);
      setData(res || []);
      dispatch(hideLoader());
    };
  
    useEffect(() => {
      bestMatch();

      if(searchResult === "") setSearchData([])
    }, []);
  
    const submitHandler = async () => {
      if (searchResult.trim() === '') return;
      if (!searchResult || searchResult.trim() === "") {
        console.error("Invalid search input");
        return;
      }
      
  
      dispatch(showLoader());
      const res = await getBestSearh(token, searchResult.trim());
      setSearchData(Array.isArray(res) ? res : []);
      dispatch(hideLoader());
    };
  
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.arrow} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-outline" size={40} />
        </TouchableOpacity>
  
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search here..."
            value={searchResult}
            onChangeText={setSearchResult}
          />
          <TouchableOpacity onPress={submitHandler} style={styles.searchBtn}>
            <Icon name="search" size={22} color={Colors.darkblack} />
          </TouchableOpacity>
        </View>
  
        <Text style={styles.headerText}>
          {searchResult.trim() === '' ? 'Best matches for you!' : 'Search Result'}
        </Text>
  
        <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 20 }}>
          {(searchResult?.trim() === '' ? data : searchData).map((user, index) => (
            <UserRequestCard key={user._id || index} data={user} />
          ))}
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#fff',
      flex: 1,
    },
    arrow: {
      marginBottom: 20,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: Colors.darkblack,
      borderWidth: 1.5,
      borderRadius: 20,
      paddingHorizontal: 10,
    },
    input: {
      flex: 1,
      height: 45,
      fontSize: 16,
    },
    searchBtn: {
      padding: 5,
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 15,
      color: Colors.darkblack,
    },
  });
  