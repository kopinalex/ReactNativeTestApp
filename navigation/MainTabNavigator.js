import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator, createSwitchNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ResultsScreen from '../screens/LinksScreen';
import ProfileScreen from "../screens/ProfileScreen";

const HomeStack = createSwitchNavigator({
    Home: HomeScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-home${focused ? '' : '-outline'}`
                    : 'ios-home'
            }
        />
    ),
};

const ResultsStack = createSwitchNavigator({
    Links: ResultsScreen,
});

ResultsStack.navigationOptions = {
    tabBarLabel: 'Info',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-podium' : 'md-podium'}
        />
    ),
};

const ProfileRoute = createSwitchNavigator({
    Profile: ProfileScreen
});

ProfileRoute.navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({focused}) => (<TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
    />),
    disable: true
};

export default createBottomTabNavigator({
    HomeStack,
    LinksStack: ResultsStack,
    ProfileRoute,
});
