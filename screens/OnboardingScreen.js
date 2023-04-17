import React from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Gaming from '../assets/images/misc/gaming.svg';
import { useNavigation } from '@react-navigation/native';
import LoginScreen from './LoginScreen';

const OnboardingScreen = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <View style={{marginTop: 30}}>
        <Text
          style={{
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            fontSize: 30,
            color: '#20315f',
          }}>
          CRA
        </Text>
      </View>
      <Image source = {{uri:'https://flatchr-production.imgix.net/5G8oWlpGoOp63O1D.png?w=1920&h=1080&background=white'}}
      style = {{ width: 400, height: 400, marginTop: 40, marginBottom:150,alignItems: 'center' }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#38416F',
          padding: 20,
          width: '90%',
          borderRadius: 10,
          marginBottom: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            color: '#ED702D',
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
            fontFamily: 'monospace',
          }}>
          Let's Begin
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnboardingScreen;