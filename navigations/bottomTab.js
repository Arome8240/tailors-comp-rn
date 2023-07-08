import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './../screens/Home';
import Login from './../screens/Login';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import Completed from '../screens/Completed';
import { StyleSheet } from 'react-native';

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
                        iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Icon name={iconName} size={20} color={color} />;
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