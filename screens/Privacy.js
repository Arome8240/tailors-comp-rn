import { View, Text, ScrollView } from 'react-native'
import React from 'react'

const Privacy = () => {
  return (
    <View
    style={{
      height: '100%'
    }}
    >
      <ScrollView
        style={{
          padding: 20,
          height: '100%'
        }}
      >
        <Text>Privacy Policy for Measurement App</Text>

        <Text>
          At Measurement App, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, and disclose your information when you use our app.
        </Text>

        <View
          style={{
            marginTop: 5
          }}
        >
          <Text
            style={{
              fontWeight: 'bold'
            }}
          >
            Information We Collect
          </Text>

          <Text>
            When you use our app, we may collect the following information:
          </Text>
        </View>

        <View
          style={{
            marginTop: 5
          }}
        >
          <Text style={{
            marginTop: 5
          }}>{`\u2022 Personal Information: When you sign up for our app, we may collect your name, email address, and other personal information you provide.`}</Text>
          <Text style={{
            marginTop: 5
          }}>{`\u2022 Measurement Data: Our app allows you to save your body measurements. We may collect and store this information to provide you with size recommendations and other features.
Usage Data: We may collect information about how you use our app, such as your `}</Text>
          <Text style={{
            marginTop: 5
          }}>{`\u2022 Usage Data: We may collect information about how you use our app, such as your interactions with our features, the pages you visit, and the searches you perform.`}</Text>
          <Text style={{
            marginTop: 5
          }}>{`\u2022 Device Information: We may collect information about the device you use to access our app, such as your device type, operating system, and browser.`}</Text>
        </View>

        <View
          style={{
            marginTop: 5
          }}
        >
          <Text
            style={{
              fontWeight: 'bold'
            }}
          >
            How We Use Your Information
          </Text>

          <Text>
          We may use your information for the following purposes:
          </Text>
        </View>

        <View
          style={{
            marginTop: 5
          }}
        >
          <Text style={{
            marginTop: 5
          }}>{`\u2022 To provide and improve our app and services, including to provide you with personalized size recommendations and other features.`}</Text>
          <Text style={{
            marginTop: 5
          }}>{`\u2022 To communicate with you about our app and services, including to send you updates and notifications. `}</Text>
          <Text style={{
            marginTop: 5
          }}>{`\u2022 To analyze and improve our app and services, including to understand how users interact with our app and to develop new features and products.`}</Text>
          <Text style={{
            marginTop: 5
          }}>{`\u2022 To comply with legal and regulatory requirements.`}</Text>
        </View>

        <View
          style={{
            marginTop: 5
          }}
        >
          <Text
            style={{
              fontWeight: 'bold'
            }}
          >
            Updates to Privacy Policy
          </Text>

          <Text>
          We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on our app or by other means.
          </Text>
        </View>

        <View
          style={{
            marginTop: 5,
            marginBottom: 30
          }}
        >
          <Text
            style={{
              fontWeight: 'bold'
            }}
          >
            Contact Us
          </Text>

          <Text>
          If you have any questions or concerns about our Privacy Policy, please contact us at tailorscompanion@outlook.com.
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default Privacy