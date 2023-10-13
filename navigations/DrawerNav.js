import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Login from '../screens/Login';
import MyTabs from './bottomTab';
import Icon from 'react-native-vector-icons/Ionicons'

import { Share, View, Text, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Privacy from '../screens/Privacy';
import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';

function CustomDrawer(props) {

  const [user, setUser] = useState(null)
  const navigation = useNavigation();

  let url = Colors.url

  //Get Measurements
  const getData = async () => {
    const token = await AsyncStorage.getItem('token')
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'token': token.slice(1, -1)
      }
    }
    await axios.get(url + 'auth/user', headers).then(resp => {
      console.log(resp.data.user)
      setUser(resp.data.user)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 5,
          height: 200
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            alignSelf: 'center',
            backgroundColor : 'grey',
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
          style={{
            position: 'relative',
            fontSize: 50,
            fontWeight: '700',
            color: 'white',
            fontFamily: 'Poppins-Regular'
          }}
          >
            {user !== null ? user.user.username.charAt(0).toUpperCase() : 'A'}
          </Text>
        </View>
        <Text
          style={{
            position: 'relative',
            alignSelf: 'center',
            fontWeight: '600',
            fontFamily: 'Poppins-Regular'
          }}
        >
          {user !== null ? user.user.username : 'Anonymous'}
        </Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem label="Share" onPress={async () => {
        try {
          const result = await Share.share({
            message: ('Share This App')
          })

          if (result.action === Share.sharedAction) {
            console.log(result.activityType)
          } else if (result.action === Share.dismissedAction) {
            console.log('dismissed')
          } else {
            console.log('shared')
          }
        } catch (error) {
          console.log(error.message)
        }
      }}
        icon={({ focused, color, size }) => <Icon name='share-social-outline' size={20} color={color} />}
      />
      <DrawerItem label="Logout" onPress={async () => {
        Alert.alert(
          "Logout",
          "Are you sure you want to logout?",
          [
            {
              text: 'Cancel',
              onPress: () => {
                return null
              }
              
            },
            {
              text: 'Confirm',
              onPress: async () => {
                await AsyncStorage.removeItem('token')
                //props.navigation.replace("Log");
                navigation.navigate({name: 'Log'})
              }
            }
          ],
          { cancelable: false}
        )

      }} icon={({ focused, color, size }) => <Icon name='log-out-outline' size={20} color={color} />} />
    </DrawerContentScrollView>
  )
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="HomeDrawer"
        component={MyTabs}
        options={{
          drawerLabel: 'Home',
          title: 'Home',
          drawerIcon: ({ focused, color, size }) => (
            <Icon name='home-outline' size={20} color={color} />
          )
        }}
      />
      <Drawer.Screen name="SettingsDrawer" component={Privacy}
        options={{
          drawerLabel: 'Privacy Policy',
          title: 'Privacy Policy',
          drawerIcon: ({ focused, color, size }) => (
            <Icon name='lock-closed-outline' size={20} color={color} />
          )
        }}
      />
    </Drawer.Navigator>
  );
}

export default MyDrawer