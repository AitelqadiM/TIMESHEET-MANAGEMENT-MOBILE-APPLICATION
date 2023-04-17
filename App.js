import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Provider } from "react-redux";
import { store } from "./store";
import AuthStack from './navigation/AuthStack';
import { AuthProvider } from './context/AuthContext';
import AppNav from './navigation/AppNav';
import { SafeAreaProvider } from 'react-native-safe-area-context';


function App() {
  return (
    <Provider store={store} >
    <SafeAreaProvider>
    <AuthProvider>
      <AppNav/>
    </AuthProvider>
    </SafeAreaProvider>
    </Provider>
  );
}

export default App;
