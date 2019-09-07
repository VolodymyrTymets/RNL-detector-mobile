import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MainScreen, ConnectionScreen } from './screens';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

export default createAppContainer(createStackNavigator({
    MainScreen: MainScreen,
    ConnectionScreen: ConnectionScreen,
  }, {
    initialRouteName: 'ConnectionScreen',
  }
));



