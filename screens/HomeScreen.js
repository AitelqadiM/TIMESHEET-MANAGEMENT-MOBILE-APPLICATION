import 'react-native-gesture-handler'
import React, {useState,useEffect} from 'react';
import {View,Text,SafeAreaView,ScrollView,ImageBackground,TextInput,TouchableOpacity,StyleSheet,Button,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc'
import ModalDropdown from 'react-native-modal-dropdown';
import moment from 'moment';
import {Dropdown,GroupDropdown,MultiselectDropdown} from 'sharingan-rn-modal-dropdown';
import { Icon } from 'react-native-elements'
import Table from '../components/Table';
import AddAbsences from './AddAbsences';
import { selectChosenMonth, setChosenMonth } from '../slices/navSlice';
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-native-modern-datepicker';

const HomeScreen = (props) => {
  const navigation = useNavigation();
  const CurrentMonth = moment(new Date(),'YYYY-MM-DD').format("YYYY MM");
  const [Pdata, setPData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  dispatch(setChosenMonth(CurrentMonth))
 


///////////////////////
const [date, setDate] = useState('');
///////////////////////

const handleLogin = async ()  => {
  fetch('http://10.103.8.107:9094/api/person/be/marouane.bouzoubaa%40ilemgroup.com')
  .then((response) => response.json())
  .then((json) => setPData(json))
  .catch((error) => console.error(error))
  .finally(() => setLoading(false));
  }
   useEffect(() => {
      setLoading(true)
      handleLogin();
    }, []);

  //////////////////
    if(date){
      dispatch(setChosenMonth(date))
      }   
//////////////////////////////////

  return ( 

        <SafeAreaView>
          <View style={tw`flex-row mt-10`}>
            <View style={tw`flex-1 mr-25`}>
            <Text style={tw`flex-1 text-5  font-bold`}>
            Welcome,
            </Text>
            <Text style={tw`flex-1 text-5  font-bold`}>
            {Pdata.greeting}. {Pdata.firstName} {Pdata.lastName}
            </Text>
            </View>
        
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ImageBackground
              source={{uri:'https://cdn-icons-png.flaticon.com/512/219/219983.png'}}
              style={{width: 50, height: 50}}
              imageStyle={{borderRadius: 15}}
            />
          </TouchableOpacity>
          </View>
          

          <View style={tw`items-center mt-2`}>
              <View style={tw`flex-row`}>
                <Text style={tw`text-black text-4 font-semibold mt-1 `}> Please specify the month: </Text>
                <TouchableOpacity style= {tw` rounded-2 mr-5 ml-5`}   
                  onPress={()=>navigation.navigate(AddAbsences)}>
                 <Icon
                 name='plus'
                 type='evilicon'
                 color='#008000'
                 size={40}
                 
                 />
                </TouchableOpacity>
              </View>
            
            <DatePicker
              mode="monthYear"
              selectorStartingYear={2000}
              onMonthYearChange={selectedDate => setDate(selectedDate)}
              options={{
                backgroundColor: '#144c8d',
                textHeaderColor: '#f47526',
                textDefaultColor: '#F6E7C1',
                selectedTextColor: '#fff',
                mainColor: '#f47526',
                textSecondaryColor: '#D6C7A1',
                borderColor: 'rgba(122, 146, 165, 0.1)',
              }}
              style={{
                marginRight: 5,
                marginLeft: 5,
                width: 300,
                paddingBottom: 35,
              }}
            />


          </View>
         <View style={tw`mt-1`}> 
         <Text style={tw`text-xl  ml-4 text-blue-500`}>-----------------------------------------------------------------</Text>
          <Table/>
         </View>
        </SafeAreaView>     
       
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingHorizontal:10,
    flex: 0,
  },
  buttonView: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
});