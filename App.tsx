/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React, {type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import CalculatorScreen from './src/pages/Calculator/CalculatorScreen';
import LoginScreen from './src/pages/Login/LoginScreen';
import MessagingScreen from './src/pages/Messaging/MessagingScreen';
import NotificationScreen from './src/pages/Notification/NotificationScreen';
import PictureScreen from './src/pages/Picture/PictureScreen';
import RegisterScreen from './src/pages/Register/RegisterScreen';
import SplashScreen from './src/pages/Splash/SplashScreen';
import LoggedInStack from './src/stacks/LoggedInStack';
import LoggedOutStack from './src/stacks/LoggedOutStack';

const App = () => {
  return (




    <NavigationContainer>
      <LoginScreen />
    </NavigationContainer>
  );
};


export default App;
