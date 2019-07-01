import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native';
import { Button, InputItem } from '@ant-design/react-native';
import { createStackNavigator } from 'react-navigation';

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      login: '',
      password: '',
      valid: true
    }
  }

  login() {
    var loginInfo = JSON.stringify({
      email: this.state.login,
      password: this.state.password,
    });
    
    return fetch('http://10.0.2.2:3000/login', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: loginInfo
    })
      .then((response) => {
        if(response.status === 400){
          this.props.navigation.navigate('Welcome', { name: 'Testing' })
        } else {
          this.setState({ valid: false });
          this.props.navigation.navigate('Main', { name: 'Testing' })
        }
      })
      .catch((err) => {
        this.setState({ valid: false });
        this.props.navigation.navigate('Main', { name: 'Testing' })
        console.log(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <InputItem
          clear
          placeholder="email@catolicasc.org.br"
          onChangeText={(login) => this.setState({ login })}
        >
          Email
        </InputItem>

        <InputItem
          clear
          type="password"
          placeholder="minha@senha123"
          onChangeText={(password) => this.setState({ password })}
        >
          Senha
        </InputItem>

        <Button onPress={() => this.login()}>Login</Button>
        <Button onPress={() => this.props.navigation.navigate('Welcome', { name: 'Testing' })}>Voltar</Button>
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
