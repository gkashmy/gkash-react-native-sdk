import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

import SubmitForm from './SubmitForm';
import ResponsePage from './ResponsePage';
import PaymentPage from 'gkash-react-native-gkashpayment';

//const deeplink = require('gkash-react-native-sdk');


const linking = {
  prefixes: ['gkash://'],
  initialRouteName: 'SubmitForm',
  config: {
    screens: {
        SubmitForm: {
        path: 'SubmitForm',
      },
      ResponsePage: {
        path: 'returntoapp'
      }

    }
  }
};


function HomeStack() {
    return (

        <NavigationContainer
            //linking={deeplink}
            linking={linking}
            fallback={<ActivityIndicator color="blue" size="large" />}
        >
            <Stack.Navigator >
                <Stack.Screen name="SubmitForm" component={SubmitForm}
                    options={{
                        headerStyle: { backgroundColor: '#238cd0' },
                        headerTintColor: 'white',
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