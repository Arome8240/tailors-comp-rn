import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native';

//Constants
import Spacing from './../constants/Spacing';
import FontSize from '../constants/FontSize'
import Colors from '../constants/Colors'
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

export default function Otp({ navigation }) {

    const [email, setEmail] = useState()
    const [focused, setFocus] = useState()

    let route = useRoute()

    let em = route.params.email

    //Ref
    const firstInput = useRef()
    const secondInput = useRef()
    const thirdInput = useRef()
    const fourthInput = useRef()
    const fifthInput = useRef()
    const sixthInput = useRef()
    const [otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '', 5: '', 6: '' })

    const verify = () => {
        let ot = otp[1] + otp[2] + otp[3] + otp[4] + otp[5] + otp[6]
        //console.log(ot)

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            email: route.params.email,
            otp: ot
        }
        axios.post(Colors.url + 'auth/otp/verify', config)
        .then(resp => {
            console.log(resp.data)
            const verified = resp.data.verified
            if (!verified) {
                return null
            }   else {
                navigation.navigate('resetp', {
                    email: route.params.email
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
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
                        Verification
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
                        Enter the OTP from the email we just sent you at {route.params.email}
                    </Text>
                </View>
                <View
                    style={{
                        marginHorizontal: 20,
                        marginBottom: 20,
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            borderRadius: 5,
                            borderColor: Colors.primary,
                            borderWidth: 1,
                            padding: 5
                        }}
                    >
                        <TextInput
                            style={{
                                fontSize: 25,
                                padding: 0,
                                textAlign: 'center',
                                paddingHorizontal: 10,
                                paddingVertical: 10
                            }}
                            keyboardType='number-pad'
                            maxLength={1}
                            ref={firstInput}
                            onChangeText={(text) => {
                                setOtp({...otp, 1: text})
                                text && secondInput.current.focus()
                            }}
                        />
                    </View>
                    <View
                        style={{
                            borderRadius: 5,
                            borderColor: Colors.primary,
                            borderWidth: 1,
                            padding: 5
                        }}
                    >
                        <TextInput
                            style={{
                                fontSize: 25,
                                padding: 0,
                                textAlign: 'center',
                                paddingHorizontal: 10,
                                paddingVertical: 10
                            }}
                            keyboardType='number-pad'
                            maxLength={1}
                            ref={secondInput}
                            onChangeText={(text) => {
                                setOtp({...otp, 2: text})
                                text ? thirdInput.current.focus() : firstInput.current.focus()
                            }}
                        />
                    </View>
                    <View
                        style={{
                            borderRadius: 5,
                            borderColor: Colors.primary,
                            borderWidth: 1,
                            padding: 5
                        }}
                    >
                        <TextInput
                            style={{
                                fontSize: 25,
                                padding: 0,
                                textAlign: 'center',
                                paddingHorizontal: 10,
                                paddingVertical: 10
                            }}
                            keyboardType='number-pad'
                            maxLength={1}
                            ref={thirdInput}
                            onChangeText={(text) => {
                                setOtp({...otp, 3: text})
                                text ? fourthInput.current.focus() : secondInput.current.focus()
                            }}
                        />
                    </View>
                    <View
                        style={{
                            borderRadius: 5,
                            borderColor: Colors.primary,
                            borderWidth: 1,
                            padding: 5
                        }}
                    >
                        <TextInput
                            style={{
                                fontSize: 25,
                                padding: 0,
                                textAlign: 'center',
                                paddingHorizontal: 10,
                                paddingVertical: 10
                            }}
                            keyboardType='number-pad'
                            maxLength={1}
                            ref={fourthInput}
                            onChangeText={(text) => {
                                setOtp({...otp, 4: text})
                                text ? fifthInput.current.focus() : thirdInput.current.focus()
                            }}
                        />
                    </View>
                    <View
                        style={{
                            borderRadius: 5,
                            borderColor: Colors.primary,
                            borderWidth: 1,
                            padding: 5
                        }}
                    >
                        <TextInput
                            style={{
                                fontSize: 25,
                                padding: 0,
                                textAlign: 'center',
                                paddingHorizontal: 10,
                                paddingVertical: 10
                            }}
                            keyboardType='number-pad'
                            maxLength={1}
                            ref={fifthInput}
                            onChangeText={(text) => {
                                setOtp({...otp, 5: text})
                                text ? sixthInput.current.focus() : fourthInput.current.focus()
                            }}
                        />
                    </View>
                    <View
                        style={{
                            borderRadius: 5,
                            borderColor: Colors.primary,
                            borderWidth: 1,
                            padding: 5
                        }}
                    >
                        <TextInput
                            style={{
                                fontSize: 25,
                                padding: 0,
                                textAlign: 'center',
                                paddingHorizontal: 10,
                                paddingVertical: 10
                            }}
                            keyboardType='number-pad'
                            maxLength={1}
                            ref={sixthInput}
                            onChangeText={(text) => {
                                setOtp({...otp, 6: text})
                                !text && fifthInput.current.focus()
                            }}
                        />
                    </View>
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
                        onPress={() => verify()}
                    >
                        <Text
                            style={{
                                fontFamily: 'Poppins-Bold',
                                color: Colors.onPrimary,
                                textAlign: 'center',
                                fontSize: FontSize.large
                            }}
                        >Verify</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}