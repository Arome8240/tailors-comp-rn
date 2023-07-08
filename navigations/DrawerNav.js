import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Login from '../screens/Login';
import MyTabs from './bottomTab';
import Icon from 'react-native-vector-icons/Ionicons'

import { Share, View, Text } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

function CustomDrawer(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View
      style={{
        backgroundColor: 'white',
        padding: 5,
        height: 150
      }}
      >
        <Text
        style={{
          position: 'relative',
          alignSelf: 'center',
          fontWeight: '600'
        }}
        >
          Tailor's Companion
        </Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem label="Share" onPress={async () => {
        try {
          const result = await Share.share({
            message: ('Tailor\'s Companion')
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
        icon={({ focused, color, size }) => <Icon name='share-social' size={20} color={color} />}
      />
      <DrawerItem label="Logout" onPress={async() => {
        await AsyncStorage.removeItem('token')
        props.navigation.replace("Log");
      }} icon={({ focused, color, size }) => <Icon name='log-out' size={20} color={color} />} />
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
            <Icon name='home-sharp' size={18} color={color} />
          )
        }}
      />
      <Drawer.Screen name="SettingsDrawer" component={Login}
        options={{
          drawerLabel: 'Privacy Policy',
          title: 'Privacy Policy',
          drawerIcon: ({ focused, color, size }) => (
            <Icon name='home-sharp' size={18} color={color} />
          )
        }}
      />
    </Drawer.Navigator>
  );
}

export default MyDrawer