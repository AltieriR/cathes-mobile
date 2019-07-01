import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { Button } from '@ant-design/react-native';
import { createStackNavigator, createAppContainer , withNavigation } from 'react-navigation';

export default class Welcome extends Component {
  /*
  static navigationOptions = {
    header: 'none'
  }*/

  render() {      
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Bem-vindo a CathES!</Text>
          <Text style={styles.welcome}>Gerenciamento de equipamentos</Text>
          <Button onPress = {() => navigate('Login', {name: 'Testing'})}>Login</Button>
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
    /*textAlign: 'center',*/
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
