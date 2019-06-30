import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Button } from '@ant-design/react-native';
import { createStackNavigator } from 'react-navigation';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <Button onPress={() => this.props.navigation.navigate('Welcome', { name: 'Testing' })}></Button>

        <Button onPress={() => this.props.navigation.navigate('Main', { name: 'Testing' })}>Main</Button>
      </View>
    );
  }
}

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
