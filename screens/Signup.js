import { View, Text, SafeAreaView, Keyboard, ActivityIndicator, Image, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spacing from './../constants/Spacing';
import FontSize from '../constants/FontSize'
import Colors from '../constants/Colors'
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const glogo = require('../src/assets/glogo.png')
const fblogo = require('../src/assets/fblogo.png')

export default function Signup({ navigation }) {
    const [focused, setFocus] = useState(false)
    const [phoneFocused, setPhoneFocus] = useState(false)
    const [passFocus, setPassFocus] = useState(false)
    const [conPassFocus, setConPassFocus] = useState(false)


    //Password Visibility
    const [passVisibility, setPassVisibility] = useState(true)
    const [conPassVisibility, setConPassVisibility] = useState(true)
    const showPassword = () => {
        setPassVisibility(current => !current)
    }

    //input datas
    const [email, setEmail] = useState()
    const [username, setUN] = useState()
    const [password, setPassword] = useState()
    const [phone, setPhone] = useState()
    const [confPass, setConPass] = useState()

    //loading state
    const [isLoading, setIsLoading] = useState(false)

    const showConPassword = () => {
        setConPassVisibility(currenty => !currenty)
    }

    //Email & Password Sign Up
    const Login = async () => {
        Keyboard.dismiss()

        const config = {
            email: email,
            phone: phone,
            password: password
        }

        const headers = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            if (password != confPass) {
                console.log('Passwords do not match!')
            } else {
                setIsLoading(true)
                const response = await axios.post('http://192.168.43.41:8000/api/v1/auth/signup', config, headers)
                setIsLoading(false)
                navigation.navigate('Log')
                console.log(JSON.stringify(response))
            }
        } catch (err) {
            setIsLoading(true)
            console.log(JSON.stringify(err.message))
        }
    }

    useEffect(() => {
        //
    }, [passVisibility, conPassVisibility])

    return (
        <View>
            <SafeAreaView>
                <View
                    style={{
                        padding: Spacing * 2,
                        backgroundColor: 'white'
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            marginVertical: Spacing * 2
                        }}
                    >
                        <Text
                            style={{
                                fontSize: FontSize.xLarge,
                                color: '#3A88E2',
                                fontFamily: "Poppins-Bold"
                            }}
                        >
                            Create Account
                        </Text>
                        <Text
                            style={{
                                fontFamily: "Poppins-SemiBold",
                                fontSize: FontSize.small,
                                maxWidth: "80%",
                                textAlign: 'center',
                                color: Colors.darkText
                            }}
                        >
                            Create an account so you can explore all the existing jobs
                        </Text>
                    </View>
                    <View
                        style={{
                            marginVertical: Spacing * 2
                        }}
                    >
                        <TextInput
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                            placeholder='Email'
                            placeholderTextColor={Colors.darkText}
                            onChangeText={text => setEmail(text)}
                            value={email}
                            style={[{
                                fontFamily: 'Poppins-Regular',
                                fontSize: FontSize.small,
                                padding: Spacing * 2,
                                backgroundColor: Colors.lightPrimary,
                                borderRadius: Spacing
                            },
                            focused && { borderWidth: 3, borderColor: '#3A88E2' }
                            ]}
                        />
                        <TextInput
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                            placeholder='Username'
                            placeholderTextColor={Colors.darkText}
                            onChangeText={text => setEmail(text)}
                            value={email}
                            style={[{
                                fontFamily: 'Poppins-Regular',
                                fontSize: FontSize.small,
                                padding: Spacing * 2,
                                marginTop: 6,
                                backgroundColor: Colors.lightPrimary,
                                borderRadius: Spacing
                            },
                            focused && { borderWidth: 3, borderColor: '#3A88E2' }
                            ]}
                        />
                        <TextInput
                            onFocus={() => setPhoneFocus(true)}
                            onBlur={() => setPhoneFocus(false)}
                            placeholder='Phone'
                            placeholderTextColor={Colors.darkText}
                            onChangeText={text => setPhone(text)}
                            value={phone}
                            style={[{
                                fontFamily: 'Poppins-Regular',
                                fontSize: FontSize.small,
                                padding: Spacing * 2,
                                marginTop: 5,
                                backgroundColor: Colors.lightPrimary,
                                borderRadius: Spacing
                            },
                            phoneFocused && { borderWidth: 3, borderColor: '#3A88E2' }
                            ]}
                        />
                        <View
                            style={{
                                justifyContent: 'center'
                            }}
                        >
                            <TextInput
                                onFocus={() => setPassFocus(true)}
                                onBlur={() => setPassFocus(false)}
                                placeholder='Password'
                                placeholderTextColor={Colors.darkText}
                                secureTextEntry={passVisibility}
                                onChangeText={text => setPassword(text)}
                                value={password}
                                style={[
                                    {
                                        fontFamily: 'Poppins-Regular',
                                        fontSize: FontSize.small,
                                        padding: Spacing * 2,
                                        marginTop: 5,
                                        backgroundColor: Colors.lightPrimary,
                                        borderRadius: Spacing
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
                        <View
                            style={{
                                justifyContent: 'center'
                            }}
                        >
                            <TextInput
                                onFocus={() => setConPassFocus(true)}
                                onBlur={() => setConPassFocus(false)}
                                onChangeText={text => setConPass(text)}
                                value={confPass}
                                placeholder='Confirm Password'
                                placeholderTextColor={Colors.darkText}
                                secureTextEntry={conPassVisibility}
                                style={[{
                                    fontFamily: 'Poppins-Regular',
                                    fontSize: FontSize.small,
                                    padding: Spacing * 2,
                                    marginTop: 5,
                                    backgroundColor: Colors.lightPrimary,
                                    borderRadius: Spacing
                                },
                                conPassFocus && { borderWidth: 3, borderColor: '#3A88E2' }
                                ]}
                            />
                            <TouchableOpacity
                                style={{ position: 'absolute', right: 25 }}
                                onPress={() => showConPassword()}
                            >
                                <Icon style={{ color: Colors.darkText }} name={conPassVisibility ? 'eye-slash' : 'eye'} size={15} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{
                            padding: Spacing * 2,
                            backgroundColor: '#3A88E2',
                            marginVertical: Spacing * 2,
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
                                >Create Account</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            padding: Spacing,
                        }}
                        onPress={() => navigation.navigate('Log')}
                    >
                        <Text
                            style={{
                                fontFamily: 'Poppins-SemiBold',
                                color: '#3A88E2',
                                textAlign: 'center',
                                fontSize: FontSize.small
                            }}
                        >Already have an account</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}