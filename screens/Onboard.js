import { View, Text, Image } from 'react-native'
import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import { SIZES, COLORS } from '../src/assets/constants/theme'

const slides = [
    {
        id: 1,
        title: 'Discover the best places',
        desc: 'A town hall different from bala blu, blue blu bulaba. broom broom broom brooooooooom. Bala blu blue blu bulaba. The farmers will make more money. Your lunch will not be imported, cassava garri ewa and ehhh ehhhhnn. The farmer will make money, the dinner would be cassava, eba, ewa and everything.',
        image: require('../src/assets/0.png')
    },
    {
        id: 3,
        title: 'Discover the best places',
        desc: 'A town hall different from bala blu, blue blu bulaba. broom broom broom brooooooooom. Bala blu blue blu bulaba. The farmers will make more money. Your lunch will not be imported, cassava garri ewa and ehhh ehhhhnn. The farmer will make money, the dinner would be cassava, eba, ewa and everything.',
        image: require('../src/assets/1.png')
    },
    {
        id: 2,
        title: 'Discover the best places',
        desc: 'A town hall different from bala blu, blue blu bulaba. broom broom broom brooooooooom. Bala blu blue blu bulaba. The farmers will make more money. Your lunch will not be imported, cassava garri ewa and ehhh ehhhhnn. The farmer will make money, the dinner would be cassava, eba, ewa and everything.',
        image: require('../src/assets/2.png')
    }
]

export default function Onboard({navigation}) {

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
                backgroundColor: COLORS.primary,
                width: 20
            }}
            showSkipButton
            renderNextButton={() => buttonLabel('Next')}
            renderSkipButton={() => buttonLabel('Skip')}
            renderDoneButton={() => buttonLabel('Done')}
            onDone={() => {
                navigation.navigate('ho')
            }}
            onSkip={() => {
                navigation.navigate('ho')
            }}
        />
    )
}