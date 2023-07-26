import { Button } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font/build/FontHooks';
import { AppLoading } from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AppOpenAd, AdEventType } from 'react-native-google-mobile-ads'

//Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//Navigation Stack
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Notification
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

//Screens
import Home from './screens/Home';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Onboard from './screens/Onboard';
import New from './screens/New';
import Forgot from './screens/Forgot';
import Otp from './screens/otp'
import ResetP from './screens/resetp';

//Environment Variable
//import {BASE_URL} from '@env'
import MyTabs from './navigations/bottomTab';
import Views from './screens/View';
import MyDrawer from './navigations/DrawerNav';
import Edit from './screens/Edit';

const Stack = createNativeStackNavigator();

//Interstitial Ads
const interstitial = InterstitialAd.createForAdRequest('ca-app-pub-6609715251129979/3712535483', {
  requestNonPersonalizedAdsOnly: true,
  //keywords: ['fashion', 'clothing'],
})

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [firstLaunch, setFirstLaunch] = React.useState(null)
  const [isLoggedIn, setLogin] = React.useState(null)
  const [bans, showBans] = React.useState(false)

  //Notifications
  const [expoPushToken, setExpoPushToken] = React.useState('');
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  //Fonts
  let [fontsLoaded] = useFonts({
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf')
  });

  const insta = () => {
    //Admob
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      interstitial.show()
    });

    interstitial.load()

    // Unsubscribe from events on unmount
    return unsubscribe;
  }


  React.useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.getItem("appLaunched")
      const token = await AsyncStorage.getItem('token')

      //console.log(token)
      if (appData == null) {
        setFirstLaunch(true)
        AsyncStorage.setItem("appLaunched", 'true')
      } else {
        setFirstLaunch(false)
      }
      if (token == null) {
        setLogin(false)
      } else {
        setLogin(true)
      }
    }
    setData()


    // Start loading the interstitial straight away
    setInterval(insta, 300000)

    setTimeout(() => { showBans(true) }, 180000)



    //set notification
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [])

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token;
  }

  if (fontsLoaded) {
    return (
      firstLaunch != null && (
        <NavigationContainer>
          <StatusBar backgroundColor='#333' style='light' />
          <Stack.Navigator>
            {
              firstLaunch && (
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="onboard"
                  component={Onboard}
                />
              )
            }
            {
              isLoggedIn ?
                <Stack.Screen
                  options={{
                    headerStyle: {
                      backgroundColor: '#fff'
                    },
                    headerShadowVisible: false,
                    headerShown: false
                  }}
                  name="Home"
                  component={MyDrawer} />
                :
                <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
            }
            <Stack.Screen options={{ headerShown: false }} name="Log" component={Login} />
            <Stack.Screen options={{ headerShown: false }} name="Signup" component={Signup} />
            <Stack.Screen
              options={{
                title: 'New Measurement',
                headerBackButtonMenuEnabled: false,
                headerTitleStyle: {
                  color: 'blue'
                },
                headerStyle: {
                  backgroundColor: '#fff',
                }
              }}
              name="New"
              component={New}
            />
            <Stack.Screen options={{ headerShown: false }} name="Forgot" component={Forgot} />
            <Stack.Screen options={{ headerShown: false }} name="otp" component={Otp} />
            <Stack.Screen options={{
              title: 'Edit Measurement',
              headerBackButtonMenuEnabled: false,
              headerTitleStyle: {
                color: 'blue'
              },
              headerStyle: {
                backgroundColor: '#fff',
              }
            }} name="edit" component={Edit} />
            <Stack.Screen options={{ headerShown: false }} name="resetp" component={ResetP} />
            <Stack.Screen
              options={({ route }) => ({
                title: route.params.name
              })}
              name="view"
              component={Views}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: '#fff'
                },
                headerShadowVisible: false,
                headerShown: false
              }}
              name="ho"
              component={MyDrawer}
            />
          </Stack.Navigator>
          {
            bans && <BannerAd
              unitId='ca-app-pub-6609715251129979/4992101522'
              size={BannerAdSize.FULL_BANNER}
              style={{ position: 'absolute', bottom: 0 }}
            />
          }
        </NavigationContainer>
      )
    )
  } else {
    <AppLoading
    />
  }
}
//<OnBoard />

//Client ID
//139974376309-09sh2ckqs8knn8fr7m1hmh8b185oddnd.apps.googleusercontent.com