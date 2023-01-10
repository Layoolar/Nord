import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../pages/Login/LoginScreen';
import SplashScreen from '../pages/Splash/SplashScreen';
import RegisterScreen from '../pages/Register/RegisterScreen';

const Stack = createStackNavigator();

const LoggedOutStack = () => {
  return (
    <Stack.Navigator
          screenOptions={{
             cardStyle: {
            backgroundColor: '#cccccc'
          },
          headerShown: false
        }}>
        <Stack.Screen name="Welcome" component={SplashScreen} />
        <Stack.Screen name="Sign In" component={RegisterScreen} />
        <Stack.Screen name="Sign Up" component={LoginScreen} />
      </Stack.Navigator>
  );
};
RegisterScreen
export default LoggedOutStack;