import { View, Text, SafeAreaView, Keyboard, ToastAndroid, BackHandler, Image, TextInput, ActivityIndicator, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

//Constants
import Spacing from './../constants/Spacing';
import FontSize from '../constants/FontSize'
import Colors from '../constants/Colors'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFonts } from 'expo-font';

//Initialize Realm 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const glogo = require('../src/assets/glogo.png')
const fblogo = require('../src/assets/fblogo.png')

export default function Login({ navigation }) {
    const [focused, setFocus] = useState(false)
    const [passFocus, setPassFocus] = useState(false)
    const [passVisibility, setPassVisibility] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const [fontsLoaded] = useFonts({
        'Poppins-semiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf')
      });

    //Input Fields
    const [passField, setPassField] = useState()
    const [emailField, setEmailField] = useState()

    const setPassBlur = () => {
        setPassFocus(false)
    }

    const showPassword = () => {
        setPassVisibility(current => !current)
    }

    //Login Function
    const Login = async () => {
        Keyboard.dismiss()

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            email: emailField,
            password: passField
        }

        try {
            setIsLoading(true)
            //console.log('loading')

            const response = await axios.post('http://192.168.43.41:8000/api/v1/auth/login', config).then((resp) => {
                //console.log(JSON.stringify(resp))
                setIsLoading(false)
                let token = JSON.stringify(resp.data.token)
                AsyncStorage.setItem('token', token)
                console.log(token)
                navigation.navigate('ho')
            }).catch((error) => {
                if (error.response) {
                    setIsLoading(false)
                    console.log(error.response.data.message)
                }   else if (error.request) {
                    //console.log(error.request)
                }   else {
                    //console.log(error.message)
                }
                //console.log(error.config)
            })
        } catch (error) {

            setIsLoading(false)
        }
    }

    useEffect(() => {
        
    }, [passVisibility])

    const setEmailBlur = () => {
        setFocus(false)
    }

    return (
        <View>
            <SafeAreaView>
                <View
                    style={{
                        padding: Spacing * 2,
                        backgroundColor: 'white',
                        height: '100%'
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            marginVertical: Spacing * 3
                        }}
                    >
                        <Text
                            style={{
                                fontSize: FontSize.xLarge,
                                color: '#3A88E2',
                                fontFamily: "Poppins-Bold"
                            }}
                        >
                            Login Here
                        </Text>
                        <Text
                            style={{
                                fontFamily: "Poppins-SemiBold",
                                fontSize: FontSize.large,
                                maxWidth: "60%",
                                textAlign: 'center',
                                color: Colors.darkText
                            }}
                        >
                            Welcome back you've been missed!
                        </Text>
                    </View>
                    <View
                        style={{
                            marginVertical: Spacing * 3
                        }}
                    >
                        <TextInput
                            onFocus={() => setFocus(true)}
                            onBlur={() => setEmailBlur()}
                            placeholder='Email'
                            onChangeText={text => setEmailField(text)}
                            value={emailField}
                            placeholderTextColor={Colors.darkText}
                            style={[{
                                fontFamily: 'Poppins-Regular',
                                fontSize: FontSize.small,
                                padding: Spacing * 2,
                                backgroundColor: 'transparent',
                                borderRadius: Spacing,
                                borderWidth: 1,
                                borderColor: 'grey'
                            },
                            focused && { borderWidth: 3, borderColor: '#3A88E2' }
                            ]}
                        />
                        <View
                            style={{
                                justifyContent: 'center',
                                marginTop: 2
                            }}
                        >
                            <TextInput
                                onFocus={() => setPassFocus(true)}
                                onBlur={() => setPassFocus(false)}
                                placeholder='Password'
                                onChangeText={text => setPassField(text)}
                                value={passField}
                                placeholderTextColor={Colors.darkText}
                                secureTextEntry={passVisibility}
                                style={[
                                    {
                                        fontFamily: 'Poppins-Regular',
                                        fontSize: FontSize.small,
                                        padding: Spacing * 2,
                                        backgroundColor: 'transparent',
                                        borderWidth: 1,
                                        borderRadius: Spacing,
                                        marginTop: 2
                                    },
                                    passFocus && { borderWidth: 3, borderColor: '#3A88E2' }
                                ]}
                            />
                            <TouchableOpacity
                                style={{ position: 'absolute', right: 25 }}
                                onPress={() => showPassword()}
                            >
                                <Icon style={{ color: Colors.darkText }} name={passVisibility ? 'eye-slash' : 'eye'} size={15} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Forgot')}
                    >
                        <View>
                            <Text
                                style={{
                                    fontFamily: 'Poppins-Bold',
                                    fontSize: FontSize.small,
                                    color: '#3A88E2',
                                    alignSelf: 'flex-end'
                                }}
                            >
                                Forgot Password?
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
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
                        }}
                        onPress={() => Login()}
                    >
                        {
                            isLoading ?
                                <ActivityIndicator size="large" color="white" />
                                : <Text
                                    style={{
                                        fontFamily: 'Poppins-Bold',
                                        color: Colors.onPrimary,
                                        textAlign: 'center',
                                        fontSize: FontSize.large
                                    }}
                                >Sign in</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            padding: Spacing,
                        }}
                        onPress={() => navigation.navigate('Signup')}
                    >
                        <Text
                            style={{
                                fontFamily: 'Poppins-SemiBold',
                                color: '#3A88E2',
                                textAlign: 'center',
                                fontSize: FontSize.small
                            }}
                        >Create new account</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}