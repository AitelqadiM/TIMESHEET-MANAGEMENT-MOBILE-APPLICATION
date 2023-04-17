import { StyleSheet, Text, TouchableOpacity, View,TextInput } from 'react-native'
import React, { Component } from 'react';
import {useEffect, useState,useCallback} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { selectChosenMonth,setChosenMonth} from '../slices/navSlice';
import moment from 'moment';
import tw from 'twrnc'
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { DatePickerModal,DatePickerInput } from 'react-native-paper-dates';
import 'intl';
import 'intl/locale-data/jsonp/en';
import AddActivity from './AddActivity';
import SelectDropdown from 'react-native-select-dropdown'
import { color } from 'react-native-tailwindcss';


const AddAbsences = () => {
  const dispatch = useDispatch();

  const monthChosen = useSelector(selectChosenMonth);
  const MonthY = moment(monthChosen,'YYYY MM').format('MM')
  const Month = moment(monthChosen,'YYYY MM').format('YYYY-MM-DD')
  const navigation = useNavigation();
  //
  const data=[{id:"01",title:"Janvier",},{id:"02",title:"Février"},{id:"03",title:"Mars"},{id:"04",title:"Avril"},{id:"05",title:"Mai"},{id:"06",title:"Juin"},{id:"07",title:"Juillet",},{id:"08",title:"Août"},{id:"09",title:"Septembre"},{id:"10",title:"Octobre"},    {id:"11",title:"Novembre"},{id:"12",title:"Décembre"},];
  const [inputDate, setInputDate] = useState(null)
  const ChosenDate= moment(inputDate,'YYYY-MM-DD').format('YYYY-MM-DD')
  const [text, onChangeText] = useState(null);
  const [Absdata, setAbsData] = useState([]);
  //
  const [AbsCatData, setAbsCatData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const todayDate = moment(new Date(),'YYYY-MM-DD').format('YYYY-MM-DD')
  const fullName="Ali.HADDANI"
//////////////////////////////////
  const [initialElements, changeEl]  = useState([]);
  const [exampleState, setExampleState] = useState(initialElements);
  const [idx, incr] = useState(1);
  ////////////////////////////
  //Dropdown
  const [AbsenceActivities, setAbsenceAct]=useState([]);
  const nameArray = AbsCatData.map(function (el) { return el.description; });
  //////////


  const addElement = () => {
    var newArray = [...initialElements , {id : idx, date: ChosenDate, comment: text }];
    incr(idx + 1);
    setExampleState(newArray);
    changeEl(newArray);
  }

//////////////////////////////////
let dates={};
initialElements.forEach((val)=>{
  dates[val.date]={selected: true, selectedColor:'#38649d'}
})
console.log(initialElements)

let Absdates={...dates};
Absdata.forEach((val)=>{
  Absdates[val.endDate]={selected: true, selectedColor:'#ed7226'}
})


//////////////////////////////////
//FUNCTION TO GET THE PAST ABSENCES
const handlePastAbs= async ()  => {
  fetch('http://10.103.8.107:9094/api/cra/getVacation/2020-01-01/'+todayDate+'/'+fullName+'%40ilemgroup.com')
  .then((response) => response.json())
  .then((json) => setAbsData(json))
  .catch((error) => console.error(error))
  .finally(() => setLoading(false));
  }
   useEffect(() => {
      setLoading(true)
      handlePastAbs();
    }, []); 

//////////////////////////////////
//Function to GET THE ABSENCE CATEGORIES
const handleAbsCategory= async ()  => {
  fetch('http://10.103.8.107:9094/api/project/fpc')
  .then((response) => response.json())
  .then((json) => setAbsCatData(json))
  .catch((error) => console.error(error))
  .finally(() => setLoading(false));
  }
   useEffect(() => {
      setLoading(true)
      handleAbsCategory();
    }, []);  


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
                      return <Text style={tw`text-xl font-semibold text-white`}> Add Absences for: {item.title} </Text>}
                    })()
                )}
                /> 
              </Text>
            </View>

            <View style={tw`mt-2`}>
            <DatePickerInput
               locale="en"
               label="Absence"
               value={inputDate}
               onChange={(d) => setInputDate(d)}
               //inputMode="start"
               mode="outlined" 
               />

              <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Commentaire"
              />   
              <View style={tw`content-center items-center w-100`}>
              <SelectDropdown
              	data={nameArray}
                dropdownIconPosition="right"
                defaultButtonText="Choose The Absence Ativity"

              	onSelect={(selectedItem, index) => {
              		console.log(selectedItem, index)
              	}}
              	buttonTextAfterSelection={(selectedItem, index) => {
              		return selectedItem
              	}}
              	rowTextForSelection={(item, index) => {
              		return item
              	}}
                buttonStyle={tw`border items-center content-center`}
                buttonTextStyle={ tw`text-4 font-bold `}

              /></View>
          <TouchableOpacity style={tw`items-center mb-2`}
               onPress={()=>addElement()}>
                 <Icon
                name='plus'
                type='evilicon'
                color='#008000'
                size={50}
                />
                <Text>Ajouter</Text>
              </TouchableOpacity>

            <View>

             <Calendar        
            initialDate={Month}
            onDayPress={day => {alert('hhh')
            }}
            firstDay={1}
            hideExtraDays={true}
            markedDates={Absdates}
          
            />

            <View style={tw`content-center items-center flex-row`}>
            <Icon
            name='controller-record'
            type='entypo'
            color='#38649d'
            size={30}
            />
            <Text style={tw`font-bold`}> Current Absences</Text>
            <Icon
            name='controller-record'
            type='entypo'
            color='#ed7226'
            size={30}
            />
            <Text style={tw`font-bold`}>Past Absences</Text>
            </View>
            </View>   
            </View>
            <View style={tw`items-end`}>
              <TouchableOpacity onPress={()=>navigation.navigate(AddActivity)}
               style= {tw`content-center items-center rounded-full bg-white w-20 mb-2 ml-5 border p-1`}>
              <View>
                 <Text style={tw`text-xl font-bold text-orange-500`}>
                   NEXT
                 </Text>
                 <Icon
                 style={tw`bg-gray-300 rounded-full`}
                 name="arrowright"
                 color="#ed7226" 
                 type="antdesign"
                 />
               </View>
              </TouchableOpacity>
            </View>
    </SafeAreaView>
  )
}

export default AddAbsences

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
  },
})