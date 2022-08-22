# Gkash DeepLink React Native SDK


This is the plugin of deep linking for Gkash Payment React Native payment module. It is ready to be implemented into any React Native (Expo or React-Native-CLI) project npm install module. The reference for implementation Gkash Payment React Native project & can be view through https://www.npmjs.com/package/gkash-react-native-gkashpayment

## Installation
```
npm i gkash-react-native-sdk
```

## ExpoKit
## React Native CLI

1. npm install following dependencies

```
npm install react-native-webview
npm install react-native-reanimated
npm install react-native-gesture-handler
npm install react-native-screens
npm install react-native-safe-area-context
npm install @react-native-community/masked-view
```

2. reference to https://www.npmjs.com/package/gkash-react-native-gkashpayment for Payment page set up.
In payment page post data should include returnURL

```
"<input name='returnurl' type='hidden' value='" + 'gkash://returntoapp'+ "'/>"+
```


## Setup with Expo projects
You can register for a scheme in your app.json
```
{
  "expo": {
    "scheme": "gkash"
  }
}
```
Next, install expo-linking which we'd need to get the deep link prefix:
```
expo install expo-linking
```
Detail could be reference https://reactnavigation.org/docs/deep-linking/#setup-with-expo-projects

## Set up with bare React Native projects​
reference https://reactnavigation.org/docs/deep-linking/#set-up-with-bare-react-native-projects
### Setup on iOS
```
npx uri-scheme add gkash --ios
```

### Setup on Android​
```
npx uri-scheme add gkash --android
```


## Prepare Navigation Component
```
//npm install below library too

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator } from 'react-native';
import SubmitForm from './SubmitForm';
import ResponsePage from './ResponsePage';
import PaymentPage from 'react-native-gkashpayment';

const deeplink = require('gkash-react-native-sdk');
const Stack = createNativeStackNavigator();

//Create Screens
function HomeStack() {
  return (

    <NavigationContainer
      linking={deeplink} //include the deeplink function from gkash-react-native-sdk
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
```

Submit issue to this repository or email to our merchantsupport@gkash.my

## License
[Apache 2.0](https://choosealicense.com/licenses/apache-2.0/)

