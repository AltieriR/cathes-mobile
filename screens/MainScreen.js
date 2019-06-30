import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView } from 'react-native';
import { Button } from '@ant-design/react-native';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }

  componentDidMount() {
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

  /*static navigationOptions = {
    header: 'none'
  }*/

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="small" color="#00ff00" />
        </View>
      );
    } else {
      let obj = this.state.dataSource.map((val, key) => {
        return <View key={key}>
          <View style={{ flex: 1, flexDirection: 'row', padding: 5 }}>
            <Image
              style={{ padding: 15, width: 50, height: 50, borderRadius: 50, overflow: 'hidden', borderWidth: 3, borderColor: 'black' }}
              source={{ uri: 'http://10.0.2.2:3000/' +val.image.replace(/\\/g, '/')}}
            />
            <View style={{ flex: 1, flexDirection: 'column', paddingStart: 10 }}>
              <Text>{val._id}</Text>
              <Text>{val.name}</Text>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: '#5e5e5e',
              borderBottomWidth: 1,
            }}
          />
        </View>
      });

      const { navigate } = this.props.navigation;
      return (
        <ScrollView
          style={{ flex: 1, backgroundColor: '#f5f5f9' }}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >

          <View
            style={{
              borderBottomColor: '#5e5e5e',
              borderBottomWidth: 1,
            }}
          />
          {obj}
          <Text>End of the List</Text>
          <Button onPress={() => navigate('Welcome', { name: 'Testing' })}>Go back</Button>

        </ScrollView>
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
