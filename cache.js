import { StyleSheet, Text, View } from 'react-native'
import React, {createContext,useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../config';

export const AuthContext = createContext();

export const AuthProvider =({children}) => {
    const [isLoading, setIsLoading] = useState (false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    
    const login = (username, password) =>{
        setIsLoading(true);
        //Base_URL is the actual api endpoint from which we will get the token
        axios.post(`${BASE_URL}`,{
            username,
            password
        })
        .then(res => {
            console.log(res.data);
            let userInfo = res.data;
            setUserInfo(userInfo);
            //get the token after login 
            setUserToken(userInfo.token)
            AsyncStorage.setItem('userInfo',JSON.stringify(userInfo))
            AsyncStorage.setItem('userToken',userInfo.token)
        })
        .catch(e=> {
            console.log(`Login error ${e}`);
        })

        //setUserToken('tryyyyyyywooooooork');
        //AsyncStorage.setItem('userToken','tryyyyyyywooooooork')
        setIsLoading(false);
    }
    const logout = () => {
        setIsLoading(true)
        setUserToken(null);
        AsyncStorage.removeItem('userInfo');
        AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    }
    
    const isLoggedIn = async() => {
        try { 
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo);

            if(userInfo){
            setUserToken(userToken);
            setUserInfo(userInfo);
            }
            
            setIsLoading(false);
        }
        catch(e){
        console.log(`isLogged in Error ${e}`);
       }
    }
    useEffect(()=>{
        isLoggedIn() 
       },[])

    return(
        <AuthContext.Provider value={{login,logout,isLoading,userToken,userInfo}}>
            {children}
        </AuthContext.Provider>
    )
}