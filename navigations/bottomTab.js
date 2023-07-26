import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './../screens/Home';
import Login from './../screens/Login';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import Completed from '../screens/Completed';
import { StyleSheet } from 'react-native';
import {Iconify } from 'react-native-iconify'

const Tab = createBottomTabNavigator();

function MyTabs() {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: styles.tabBarStyle,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        if (iconName = focused) {
                            return <Iconify icon="ic:outline-pending-actions" size={24} color={Colors.primary}/>
                        } else {
                            return <Iconify icon="ic:outline-pending-actions" size={24}/>
                        }
                        
                    } else if (route.name === 'Settings') {
                        if (iconName = focused) {
                            return <Iconify icon="ant-design:file-done-outlined" size={24} color={Colors.primary}/>
                        } else {
                            return <Iconify icon="ant-design:file-done-outlined" size={24}/>
                        }
                        
                    }

                    //return <Iconify icon={iconName} size={20} color={color} />;
                },
                tabBarActiveTintColor: Colors.primary,
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{ unmountOnBlur: true, tabBarLabel: 'Pending' }} />
            <Tab.Screen name="Settings" component={Completed} options={{ unmountOnBlur: true, tabBarLabel: 'Completed' }} />
        </Tab.Navigator>
    );
}

export default MyTabs

const styles = StyleSheet.create({
    tabBarStyle: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 70,
        paddingBottom: 5
    }
})