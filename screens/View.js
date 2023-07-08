import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import moment from 'moment';

export default function Views({ navigation }) {

    let [meas, setMeas] = useState()
    const [isLoading, setLoading] = useState(true)

    let url = 'http://192.168.43.41:8000/api/v1/'

    let route = useRoute()

    let id = route.params.id

    const edit = () => {
        navigation.navigate('edit', {
            id: id
        })
    }

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
            setMeas(resp.data)
            setLoading(false)
            //console.log(resp.data)
        }).catch(err => {

        })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <View>
            <SafeAreaView>
                <ScrollView>
                    {
                        isLoading
                            ?
                            <View
                                style={{
                                    padding: 10
                                }}
                            >
                                <ActivityIndicator />
                            </View>
                            :
                            <View
                                style={{
                                    padding: 10
                                }}
                            >
                                <View
                                    style={{
                                        alignItems: 'center'
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-Bold',
                                            fontSize: 25,
                                            color: Colors.primary
                                        }}
                                    >{route.params.name}</Text>
                                </View>
                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        padding: 10,
                                        marginTop: 5
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-Bold',
                                            FontSize: 30
                                        }}
                                    >
                                        Name:
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-Regular'
                                        }}
                                    >
                                        {meas.name}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        padding: 10,
                                        marginTop: 5
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-Bold',
                                            FontSize: 30
                                        }}
                                    >
                                        Contact:
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-Regular'
                                        }}
                                    >
                                        0{meas.contact}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        padding: 10,
                                        marginTop: 5
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-Bold',
                                            FontSize: 30
                                        }}
                                    >
                                        Due Date:
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-Regular'
                                        }}
                                    >
                                        {moment(meas.deliveryDate).format('ll')}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        padding: 10,
                                        marginTop: 5
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-Bold',
                                            FontSize: 30
                                        }}
                                    >
                                        Gender:
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-Regular'
                                        }}
                                    >
                                        {meas.gender}
                                    </Text>
                                </View>
                                {meas.meas.map((item, i) => (
                                    <View
                                        style={{
                                            backgroundColor: 'white',
                                            padding: 15,
                                            marginTop: 5,
                                            justifyContent: 'space-between',
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: 'Poppins-Bold'
                                            }}
                                        >
                                            {item.name}
                                        </Text>
                                        <Text
                                            style={{
                                                fontFamily: 'Poppins-Regular'
                                            }}
                                        >
                                            {item.value}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                    }
                    <View
                        style={{
                            padding: 5
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.primary,
                                marginTop: 10,
                                padding: 15,
                                alignContent: 'center',
                                alignItems: 'center',
                                borderRadius: 5,
                            }}
                            onPress={() => edit()}
                        >
                            <Text style={{ color: 'white', fontFamily: 'Poppins-Regular' }}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}