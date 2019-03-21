import React from 'react';
import {createAppContainer, createSwitchNavigator, createStackNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import ExtraScreen from "../screens/ExtraScreen";

const secondNav = createStackNavigator({
    Extra: ExtraScreen,

}, {
    headerMode: 'none'
});

export default createAppContainer(createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator, Second: secondNav
}));