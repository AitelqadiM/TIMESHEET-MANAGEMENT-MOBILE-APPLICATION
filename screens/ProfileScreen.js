import React, { Component } from 'react';
import {useEffect, useState} from 'react';
import { StyleSheet, Text,SafeAreaView,View,ActivityIndicator,TouchableOpacity, FlatList, Image,KeyboardAvoidingView } from 'react-native';
//import { useDispatch, useSelector } from 'react-redux'
//import { selectStartingdate, setStartingdate} from '../slices/navSlice';
import moment from 'moment';

const ProfileScreen = () => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  //const dispatch = useDispatch();
  //const origin = useSelector(selectStartingdate);
  //console.log(moment(origin.Startingdate,'YYYY-MM').format('MM-YYYY'))
  const handlefetch = () =>{        
    fetch('http://10.103.8.107:9094/api/person/be/marouane.bouzoubaa%40ilemgroup.com')
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }
  useEffect(() => {
    setLoading(true)
    handlefetch();
  }, []);
  

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.headerContent}>
      {(() => {
          if(data.sex == 'M')
            return <Image style={styles.avatar}
            source={{uri: 'https://i.pinimg.com/originals/49/3f/a0/493fa0f13970ab3ef29375669f670451.jpg'}}/>
          return <Image style={styles.avatar}
            source={{uri: 'https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/60-512.png'}}/>
          })()}
          <Text style={styles.name}> {data.greeting}. {data.firstName} {data.lastName} </Text>
          <Text style={styles.userInfo}> {data.email} </Text>
          <Text style={styles.userInfo}>{data.groupCompanyName} </Text> 
                
      </View>
    </View>
    
    <View style={styles.body}>
    <View style={styles.item}>
              <View style={styles.infoContent}>
                <Text style={styles.info}>Business Unit:         Microsoft Business Unit</Text>
                <Text style={styles.info}>Responsable:                        NaN</Text>
                <Text style={styles.info}>Nombre d'heure Hebdo:               {data.weeklyWorkingHours}</Text>
              </View>
    </View>    
    </View>



</View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    body:{
    backgroundColor: "#778899",
    height:600,
    alignItems:'center',
    borderRadius: 20
  },
  container: {
    flex: 1,

    //justifyContent: 'center',
    //alignItems: 'center',
  },
  header:{
    alignItems:'center',
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  button: {
    backgroundColor: '#FF6700',
    width: '35%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 50
  },
  name:{
    fontSize:25,
    color:"#000000",
    fontWeight:'600',
  },
  userInfo:{
    fontSize:17,
    color:"#778899",
    fontWeight:'600',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    marginTop: 20,

  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 25,
  },

  item:{
    flexDirection : 'row',
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5
  },
  iconContent:{
    flex:1,
    alignItems:'flex-end',
    paddingRight:5,
  },
  icon:{
    width:30,
    height:30,
    marginTop:20,
  },
  info:{
    fontSize:18,
    marginTop:30,
    color: "#FFFFFF",
  }
})