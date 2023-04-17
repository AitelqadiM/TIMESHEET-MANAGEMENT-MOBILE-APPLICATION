import { StyleSheet, Text, TouchableOpacity, View,TextInput,ScrollView } from 'react-native'
import {
  Dropdown,
  GroupDropdown,
  MultiselectDropdown,
} from 'sharingan-rn-modal-dropdown';
import { useDispatch, useSelector } from 'react-redux'
import { selectChosenMonth,setChosenMonth} from '../slices/navSlice';
import moment from 'moment';
import tw from 'twrnc'
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import React, {useEffect, useState,useCallback} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeScreen from './HomeScreen'

const data=[{id:"01",title:"Janvier",},{id:"02",title:"Février"},{id:"03",title:"Mars"},{id:"04",title:"Avril"},{id:"05",title:"Mai"},{id:"06",title:"Juin"},{id:"07",title:"Juillet",},{id:"08",title:"Août"},{id:"09",title:"Septembre"},{id:"10",title:"Octobre"},    {id:"11",title:"Novembre"},{id:"12",title:"Décembre"},];

export const datax = [
  {
    value: '1',
    label: 'Projet',
  },

];
export const datam = [
  {
    value: '1',
    label: 'Accompagnement montée en version du Portail TPOG',
  },
  {
    value: '2',
    label: 'Commercial ROC',
  },
  {
    value: '3',
    label: 'Commercial INFO',
  },
  {
    value: '4',
    label: 'Commercial MA',
  },

];
export const datac = [
  {
    value: '1',
    label: 'Affaires internes ilem MA',
  },
  {
    value: '2',
    label: 'Avant vente ilemMA',
  },

];

const AddActivity = () => {
  const [valueSS, setValueSS] = useState('');
  const onChangeSS = (value) => {
    setValueSS(value);
  };
  const [valueSX, setValueSX] = useState('');
  const onChangeSX = (value) => {
    setValueSX(value);
  };
  const [valueSB, setValueSB] = useState('');
  const onChangeSB = (value) => {
    setValueSB(value);
  };

  //////////////////////
  const dispatch = useDispatch();
  const monthChosen = useSelector(selectChosenMonth);
  const MonthY = moment(monthChosen,'YYYY MM').format('MM')
  //////////////////////
  const navigation =useNavigation();

  return (
<SafeAreaView>
         <View style={tw`bg-blue-900 border-2 p-2 border-orange-500 items-center rounded-2 w-90 mr-5 ml-5`}>
           <Text style={tw`text-xl font-semibold text-white `}> 
           <FlatList
             data={data}
             horizontal
             initialNumToRender={50}
             renderItem={({item}) => (
               (() => {
                 if(item.id == MonthY){
                   return <Text style={tw`text-xl font-semibold text-white`}> Add Activity for: {item.title} </Text>}
                 })()
             )}
             /> 
           </Text>
         </View>

      <ScrollView>
        <View style={tw`mt-10 ml-2 mr-2`}>
          <Dropdown
            label="Select Project Category"
            data={datax}
            enableSearch
            value={valueSS}
            onChange={onChangeSS}
          />
        </View>
        <View style={tw`mt-5 ml-2 mr-2`}>
        <Dropdown
            label="Select Project"
            data={datam}
            enableSearch
            value={valueSX}
            onChange={onChangeSX}
          />
        </View>
        <View style={tw`mt-5 ml-2 mr-2`}>
        <Dropdown
            label="Select Activity"
            data={datac}
            enableSearch
            value={valueSB}
            onChange={onChangeSB}
          />
        </View>
      </ScrollView>
      <TouchableOpacity 
      style={{
        backgroundColor: '#ed7226',
        padding: 20,
        borderRadius: 10,
        marginTop: 30,
      }} onPress={()=>navigation.navigate(HomeScreen)}>
        <Text style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 20,
          color: 'blue',
        }}>SUBMIT</Text>
      </TouchableOpacity>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
  },
  buttonView: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default AddActivity;