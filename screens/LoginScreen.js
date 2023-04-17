import React,{useContext,useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({navigation}) => {
  const[email,setEmail]=useState(null);
  const[password,setPassword]=useState(null);
  const{login}=useContext(AuthContext)
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>

        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>
        <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons
            name="alternate-email"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
/>

<InputField
          label={'Password'}
          icon={
            <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          inputType="password"
          
          fieldButtonFunction={() => {}}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        
        <CustomButton label={"Login"} onPress={() => {login(email,password)}} />

      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;