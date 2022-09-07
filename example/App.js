import React from 'react';
import { StyleSheet,  View,StatusBar,SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import Navigator from './components/HomeStack';

export default function App() {

  return (
    <View style={styles.screen} >
      <StatusBar barStyle='dark-content'/>
      <Navigator />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});