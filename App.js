import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { Button } from '@ant-design/react-native';
import { createStackNavigator, createAppContainer , withNavigation } from 'react-navigation';
import Login from './screens/Login';
import Welcome from './screens/Welcome';
import MainScreen from './screens/MainScreen';

class App extends Component {

  render() {
      const {navigate} = this.props.navigation;
      return (
        <AppNavigator/>
      );
  }
}

const AppNavigator = createStackNavigator({
  Welcome: { screen: Welcome},
  Login: { screen: Login },
  Main: { screen: MainScreen } 
},
{
  initialRouteName: 'Welcome'
});

export default createAppContainer(AppNavigator);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
