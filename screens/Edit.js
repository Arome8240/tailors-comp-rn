import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute, useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import axios from 'axios';

//Constants
import Spacing from './../constants/Spacing';
import FontSize from '../constants/FontSize'
import Colors from '../constants/Colors'
import Icon from 'react-native-vector-icons/FontAwesome5';

//Select Component
import DropdownSelect from 'react-native-input-select';
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function Edit({ navigation }) {

    let route = useRoute()
    let navi = useNavigation()

    let url = Colors.url

    //Get Measurements
    const getData = async () => {
        const token = await AsyncStorage.getItem('token')

        let id = route.params.id
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'token': token.slice(1, -1)
            }
        }

        await axios.get(url + `post/${id}`, headers).then(resp => {
            //console.log(resp.data)
            setPre(false)
            setName(resp.data.name)
            setGender(resp.data.gender)
            setPhone(resp.data.contact.toString())
            setFormVal(resp.data.meas)

            //Date
            const currentDate = resp.data.deliveryDate
            //setDate(currentDate)

            let tempDate = new Date(currentDate)
            let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
            setText(fDate)
            setDate(tempDate)

            //console.log(text)
        }).catch(err => {
            setPre(false)
        })
    }

    const [formVal, setFormVal] = useState([{ name: '', value: '' }])

    const addRow = () => {
        setFormVal([...formVal, { name: '', value: '' }])
    }

    const removeItem = (i) => {
        const newForm = [...formVal]
        newForm.splice(i, 1)
        setFormVal(newForm)
    }

    //input datas
    const [names, setName] = useState()
    const [phone, setPhone] = useState()
    const [gender, setGender] = useState()

    //Date Picker
    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    let fDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    const [text, setText] = useState(fDate)
    const [toks, setToks] = useState()
    const [focused, setFocus] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const onDate = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setDate(currentDate)

        let tempDate = new Date(currentDate)
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
        setText(fDate)
        setShow(false)
        setDate(tempDate)
    }

    const showMode = () => {
        setShow(true)
    }

    const handName = (i, text) => {
        let newForm = [...formVal]
        newForm[i].name = text
        setFormVal(newForm)
    }

    const handValue = (i, text) => {
        let newForm = [...formVal]
        newForm[i].value = text
        setFormVal(newForm)
    }


    const save = async () => {
        const token = await AsyncStorage.getItem('token')

        const config = {
            name: names,
            phone: phone,
            date: date,
            meas: formVal,
            gender: gender
        }

        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'token': token.slice(1, -1)
            }
        }
        //console.log(toks)
        console.log(headers)

        try {
            setIsLoading(true)
            let id = route.params.id

            await axios.put(url + `post/${id}`, config, headers).then((resp) => {
                setIsLoading(false)
                //console.log(resp)
                navigation.navigate('ho')
            }).catch((error) => {
                if (error.response) {
                    setIsLoading(false)
                    console.log(error.response)
                } else if (error.request) {
                    //console.log(error.request)
                } else {
                    //console.log(error.message)
                }
                //console.log(error.config)
            })
        } catch (error) {

            setIsLoading(false)
        }
    }

    //loading state
    const [preload, setPre] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    return (
        <View>
            <SafeAreaView
                style={{
                    height: '100%',
                    backgroundColor: 'white'
                }}
            >
                <ScrollView>
                    {
                        preload ?
                            <ActivityIndicator />
                            :
                            <View
                                style={{
                                    padding: Spacing * 2,
                                    backgroundColor: 'white'
                                }}
                            >
                                <View
                                    style={{
                                        marginVertical: Spacing * 2
                                    }}
                                >
                                    <TextInput
                                        onFocus={() => setFocus(true)}
                                        onBlur={() => setFocus(false)}
                                        placeholder='Name'
                                        placeholderTextColor={Colors.darkText}
                                        onChangeText={text => setName(text)}
                                        value={names}
                                        style={{
                                            fontFamily: 'Poppins-Regular',
                                            fontSize: FontSize.small,
                                            padding: Spacing * 2,
                                            borderRadius: Spacing,
                                            borderWidth: 1
                                        }}
                                    />
                                    <TextInput
                                        placeholder='Phone'
                                        keyboardType='number-pad'
                                        placeholderTextColor={Colors.darkText}
                                        onChangeText={text => setPhone(text)}
                                        value={phone}
                                        style={{
                                            fontFamily: 'Poppins-Regular',
                                            fontSize: FontSize.small,
                                            padding: Spacing * 2,
                                            marginTop: 5,
                                            borderWidth: 1,
                                            borderRadius: Spacing
                                        }}
                                    />

                                    <View
                                        style={{
                                            marginTop: 5
                                        }}
                                    >
                                        <TouchableOpacity title='date' onPress={() => showMode('date')}
                                            style={{
                                                borderWidth: 1,
                                                height: 60,
                                                borderRadius: 10,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                paddingHorizontal: 20,
                                                paddingTop: 20
                                            }}
                                        >
                                            <Text>
                                                {text}
                                            </Text>
                                            <Icon name="chevron-down" size={18} />
                                        </TouchableOpacity>
                                    </View>

                                    {
                                        show && (
                                            <RNDateTimePicker
                                                testID='dateTimePicker'
                                                value={date}
                                                mode={mode}
                                                is24Hour={true}
                                                display='default'
                                                onChange={onDate}
                                            />
                                        )
                                    }

                                    {/*Gender*/}
                                    <View
                                        style={{
                                            marginTop: 5
                                        }}
                                    >
                                        <DropdownSelect
                                            placeholder='Select an options...'
                                            options={[
                                                { name: 'Male', value: 'male' },
                                                { name: 'Female', value: 'female' }
                                            ]}
                                            optionLabel={'name'}
                                            optionValue={'value'}
                                            selectedValue={gender}
                                            onValueChange={(value) => setGender(value)}
                                        ></DropdownSelect>
                                    </View>
                                    {
                                        formVal.map((item, i) => (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    marginTop: 5
                                                }}
                                                key={i}
                                            >
                                                <TextInput
                                                    placeholder='name'
                                                    value={item.name || ''}
                                                    style={{
                                                        borderWidth: 1,
                                                        width: 130,
                                                        borderRadius: 5,
                                                        textAlign: 'center',
                                                        height: 50
                                                    }}
                                                    onChangeText={(text) => handName(i, text)}
                                                />
                                                <TextInput
                                                    placeholder='value'
                                                    value={item.value.toString() || ''}
                                                    style={{
                                                        borderWidth: 1,
                                                        width: 130,
                                                        borderRadius: 5,
                                                        textAlign: 'center'
                                                    }}
                                                    onChangeText={(text) => handValue(i, text)}
                                                    keyboardType='number-pad'
                                                />
                                                {
                                                    i === 0
                                                        ?
                                                        <TouchableOpacity
                                                            style={{
                                                                alignContent: 'center',
                                                            }}

                                                        >

                                                        </TouchableOpacity>
                                                        :
                                                        <TouchableOpacity
                                                            style={{
                                                                alignContent: 'center',
                                                            }}
                                                            onPress={() => removeItem(i)}
                                                        >
                                                            <Icon style={{ color: 'red', marginTop: 10, marginLeft: 12, fontSize: 35 }} name='window-close' />
                                                        </TouchableOpacity>
                                                }
                                            </View>
                                        ))
                                    }

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => addRow()}
                                            style={{
                                                padding: Spacing * 2,
                                                backgroundColor: '#3A88E2',
                                                marginVertical: Spacing * 3,
                                                borderRadius: Spacing,
                                                shadowColor: Colors.primary,
                                                shadowOffset: {
                                                    width: 0,
                                                    height: Spacing,
                                                },
                                                shadowOpacity: 0.3,
                                                color: 'white'
                                            }}
                                        >
                                            <Text style={{ color: 'white' }}>Add</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => save()}
                                            style={{
                                                padding: Spacing * 2,
                                                marginVertical: Spacing * 3,
                                                backgroundColor: '#49c730',
                                                borderRadius: Spacing,
                                                shadowColor: Colors.primary,
                                                shadowOffset: {
                                                    width: 0,
                                                    height: Spacing,
                                                },
                                                shadowOpacity: 0.3,
                                            }}
                                        >
                                            {isLoading
                                                ?
                                                <ActivityIndicator />
                                                :
                                                <Text style={{ color: 'white' }}>Update</Text>}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                    }
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}