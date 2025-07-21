import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import ViewMatch from '../../component/HomePage/ViewMatch'
import TrendingSkill from '../../component/HomePage/TrendingSkill'
import NearByPeople from '../../component/HomePage/NearByPeople'
import TopBar from '../../component/HomePage/TopBar'
import { Colors } from '../../color/color'
import DevToolsScreen from '../../component/common/TempDevBtn'

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <TopBar/>
      <View style={{padding:15}}>
      <ViewMatch/>
      </View>
      <TrendingSkill/>
      <NearByPeople/>
      <DevToolsScreen/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop:30    
  },
});