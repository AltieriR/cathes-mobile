import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { Button } from '@ant-design/react-native';

export default class App extends Component {
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

  render() {
    if(this.state.isLoading){
      return (
        <View style={styles.container}>
          <ActivityIndicator size="small" color="#00ff00" />
        </View>
      );
    } else {
      console.log(this.state.isLoading);
      let obj = this.state.dataSource.map((val, key) => {
        return <View key={key}>
          <Text>{val._id}</Text>
        </View>
      });
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Button disabled>default disabled</Button>
          {obj}
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
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
