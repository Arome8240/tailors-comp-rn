import { View, Text, Image } from 'react-native'
import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import { SIZES, COLORS } from '../src/assets/constants/theme'
import Colors from '../constants/Colors'

const slides = [
    {
        id: 1,
        title: 'Welcome to MeasureMaster',
        desc: 'Welcome to MeasureMaster, your ultimate companion for precision measurements! Our app is designed with a focus on user experience, offering an intuitive and sleek UI that makes measuring a breeze. Whether you\'re a professional contractor, DIY enthusiast, or simply someone who values accurate measurements, MeasureMaster is here to streamline your workflow and elevate your projects to new heights.',
        image: require('../src/assets/0.png')
    },
    {
        id: 3,
        title: 'Seamless Syncing',
        desc: 'MeasureMaster empowers you to take your measurements with you, wherever you go. Our seamless syncing feature ensures that your measurements are securely stored in the cloud, allowing you to retrieve them instantly from any device. Whether you\'re on your smartphone at the worksite or on your tablet at home, your measurements are at your fingertips, ready to assist you in every step of your project.',
        image: require('../src/assets/1.png')
    },
    {
        id: 2,
        title: 'Stay On Top of Your Jobs',
        desc: 'Never miss a beat with MeasureMaster\'s powerful notification system. Stay organized and informed with timely reminders of pending jobs and important project milestones. Our push notification feature ensures that you\'re always aware of upcoming deadlines, so you can manage your projects efficiently and deliver outstanding results, all without the stress of keeping track of every detail.',
        image: require('../src/assets/2.svg')
    }
]

export default function Onboard({ navigation }) {

    const buttonLabel = (label) => {
        return (
            <View
                style={{
                    padding: 12
                }}
            >
                <Text
                    style={{
                        color: COLORS.title,
                        fontWeight: '600',
                        fontSize: SIZES.h4
                    }}
                >
                    {label}
                </Text>
            </View>
        )
    }

    return (
        <AppIntroSlider
            data={slides}
            renderItem={({ item }) => {
                return (
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            padding: 15,
                            paddingTop: 100
                        }}
                    >
                        <Image
                            source={item.image}
                            style={{
                                width: SIZES.width - 80,
                                height: 400
                            }}
                            resizeMode="contain"
                        />
                        <Text
                            style={{
                                fontWeight: 'bold',
                                color: COLORS.title,
                                fontSize: SIZES.h1
                            }}
                        >
                            {item.title}
                        </Text>
                        <Text
                            style={{
                                textAlign: 'center',
                                paddingTop: 5,
                                color: COLORS.title
                            }}
                        >
                            {item.desc}
                        </Text>
                    </View>
                )
            }}
            activeDotStyle={{
                backgroundColor: Colors.primary,
                width: 20
            }}
            showSkipButton
            renderNextButton={() => buttonLabel('Next')}
            renderSkipButton={() => buttonLabel('Skip')}
            renderDoneButton={() => buttonLabel('Done')}
            onDone={() => {
                navigation.navigate('Log')
            }}
            onSkip={() => {
                navigation.navigate('Log')
            }}
        />
    )
}