import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { Component, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

//Constants
import Spacing from './../constants/Spacing';
import FontSize from '../constants/FontSize'
import Colors from '../constants/Colors'
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

export default function ResetP({ navigation }) {

    const route = useRoute()

    const [password, setPassword] = useState()
    const [confirm, setConfirm] = useState()
    const [focused, setFocus] = useState()
    const [focusedT, setFocusT] = useState()
    const [loading, setLoading] = useState(false)

    const reset = async () => {
        //console.log(email)
        if (password !== confirm) {
            console.log('Passwords do not match')
        }   else {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
                email: route.params.email,
                password: password
            }
            setLoading(true)
            axios.post(Colors.url + 'auth/password/new', config)
            .then(resp => {
                console.log(resp.data)
                setLoading(false)
                setPassword('')
                setConfirm('')
                navigation.navigate('Log')
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
        }
    }

    return (
        <View>
            <SafeAreaView>
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
                        Reset Password
                    </Text>
                    <Text
                        style={{
                            fontFamily: "Poppins-SemiBold",
                            fontSize: FontSize.medium,
                            maxWidth: "60%",
                            textAlign: 'center',
                            color: Colors.darkText
                        }}
                    >
                        Please Enter Your Email So We Can Help You Recover Your Password
                    </Text>
                </View>
                <View
                    style={{
                        paddingHorizontal: 10,
                    }}
                >
                    <TextInput
                        placeholder='Enter Password'
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        placeholderTextColor={Colors.darkText}
                        onChangeText={text => setPassword(text)}
                        value={password}
                        style={[{
                            fontFamily: 'Poppins-Regular',
                            fontSize: FontSize.small,
                            padding: Spacing * 2,
                            backgroundColor: Colors.lightPrimary,
                            borderRadius: Spacing
                        },
                        focused && { borderWidth: 3, borderColor: '#3A88E2' }
                        ]}
                    >

                    </TextInput>
                </View>
                <View
                    style={{
                        paddingHorizontal: 10,
                        marginTop: 5
                    }}
                >
                    <TextInput
                        placeholder='Confirm Password'
                        onFocus={() => setFocusT(true)}
                        onBlur={() => setFocusT(false)}
                        placeholderTextColor={Colors.darkText}
                        onChangeText={text => setConfirm(text)}
                        value={confirm}
                        style={[{
                            fontFamily: 'Poppins-Regular',
                            fontSize: FontSize.small,
                            padding: Spacing * 2,
                            backgroundColor: Colors.lightPrimary,
                            borderRadius: Spacing
                        },
                        focusedT && { borderWidth: 3, borderColor: '#3A88E2' }
                        ]}
                    >

                    </TextInput>
                </View>
                <View
                    style={{
                        paddingHorizontal: 10
                    }}
                >
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
                        onPress={() => reset()}
                    >
                        {
                            loading ?
                                <ActivityIndicator size="large" color="white" />
                                : <Text
                                    style={{
                                        fontFamily: 'Poppins-Bold',
                                        color: Colors.onPrimary,
                                        textAlign: 'center',
                                        fontSize: FontSize.large
                                    }}
                                >Reset Password</Text>
                        }
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}