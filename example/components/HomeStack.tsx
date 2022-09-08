import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

import SubmitForm from './SubmitForm';
import ResponsePage from './ResponsePage';
import PaymentPage from './PaymentPage';

const deeplink = require('gkash-react-native-sdk');

function HomeStack() {
  return (

    <NavigationContainer
      linking={deeplink}
      fallback={<ActivityIndicator color="blue" size="large" />}
    >
      <Stack.Navigator >
        <Stack.Screen name="InitialPage" component={SubmitForm}
        options ={{
            headerStyle:{backgroundColor:'#238cd0'},
            headerTintColor:'white',
            headerLeft: () => {
                return null;
            }
        }}
/>
        <Stack.Screen name="ResponsePage" component={ResponsePage} />
        <Stack.Screen name="PaymentPage" component={PaymentPage} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeStack;