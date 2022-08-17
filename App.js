import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

import Home from './Home';
import Profile from './Profile';


const linking = {
  prefixes: ['gkash://'],
  initialRouteName: 'Home',
  config: {
    screens: {
      Home: {
        path: 'home',
      },
      Profile: {
        path: 'profile/:Id'
      }

    }
  }
};


function App() {
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