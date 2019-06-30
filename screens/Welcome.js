import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { Button } from '@ant-design/react-native';
import { createStackNavigator, createAppContainer , withNavigation } from 'react-navigation';

export default class Welcome extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }

  componentDidMount(){
    return fetch('http://10.0.2.2:3000/equipment')
      .then((resp) => resp.json())
      .then((resJson) => {
        this.setState({
          isLoading: false,
          //Expecting only one result - make it dynamic
          dataSource: resJson,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /*
  static navigationOptions = {
    header: 'none'
  }*/

  render() {
    if(this.state.isLoading){
      return (
        <View style={styles.container}>
          <ActivityIndicator size="small" color="#00ff00" />
        </View>
      );
    } else {
      let obj = this.state.dataSource.map((val, key) => {
        return <View key={key}>
          <Text>{val._id}</Text>
        </View>
      });
      
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Bem-vindo a CathES!</Text>
          <Text style={styles.welcome}>Gerenciamento de equipamentos</Text>
          <Button disabled>default disabled</Button>
          {obj}
          <Text></Text>
          <Button onPress = {() => navigate('Login', {name: 'Testing'})}>Login</Button>
        </View>
      );
    }
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
