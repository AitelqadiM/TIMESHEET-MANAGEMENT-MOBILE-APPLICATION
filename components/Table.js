import React,{useEffect, useState,useCallback}  from 'react';
import { StyleSheet, Text, TouchableOpacity, View,TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import tw from "twrnc";
import { FlatList } from 'react-native-gesture-handler';
import { interpolateNode } from 'react-native-reanimated';
import moment from 'moment';

export default function Table() {

  const [WeekAllocationsdata, setWeekAllocations] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const todayDate = moment(new Date(),'YYYY-MM-DD').format('DD-MM-YYYY')
  
  //////////////////////
  const handleWeekAllocations= async ()  => {
    fetch('http://10.103.8.107:9094/api/cra/getWeekAllocations/01-01-2020/'+todayDate+'/marouane.BOUZOUBAA%40ilemgroup.com')
    .then((response) => response.json())
    .then((json) => setWeekAllocations(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
    }
     useEffect(() => {
        setLoading(true)
        handleWeekAllocations();
      }, []);  
      ////////////////

  return (
      <View>
        <DataTable>
        <DataTable.Header >
             <DataTable.Title>Semaine</DataTable.Title>
             <DataTable.Title>Début de Semaine</DataTable.Title>
             <DataTable.Title numeric>Status</DataTable.Title>
           </DataTable.Header>
        </DataTable>

      <FlatList
    data={WeekAllocationsdata}
    //initialNumToRender={50}
    maxToRenderPerBatch={50}
    renderItem={({item}) => (
           <DataTable>
           <DataTable.Row>
             <DataTable.Cell>{item.weekNumber}</DataTable.Cell>
             <DataTable.Cell>{item.weekStart}</DataTable.Cell>
             <DataTable.Cell numeric>{item.status}</DataTable.Cell>
           </DataTable.Row>
         </DataTable>
    )}
     />  

      </View>


  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 30,

  },
});