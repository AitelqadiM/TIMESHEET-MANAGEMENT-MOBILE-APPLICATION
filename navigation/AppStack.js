import 'react-native-gesture-handler'
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomDrawer from '../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddAbsences from '../screens/AddAbsences'
import { NavigationContainer } from '@react-navigation/native';
import AddActivity from '../screens/AddActivity';

const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator();

const HomeScreenStack = () => (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false,}}/>
      <HomeStack.Screen name="AddAbsences" component={AddAbsences} options={{ headerShown: false,}}/>
      <HomeStack.Screen name="AddActivity" component={AddActivity} options={{ headerShown: false,}}/>
    </HomeStack.Navigator>
  );

const AuthStack = () => {
  return (
    <NavigationContainer independent={true}>
    <Drawer.Navigator
    useLegacyImplementation
    drawerContent={(props) => <CustomDrawer {...props} />}
    screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor: '#aa18ea',
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#333',
      drawerLabelStyle: {
        marginLeft: -25,
        fontFamily: 'Roboto',
        fontSize: 15,
      },
    }}>
        <Drawer.Screen
        name="Home"
        component={HomeScreenStack}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),

        }}
      />
        <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),

        }}
      />

    </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;  