import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { Button, InputItem, Modal, Provider } from '@ant-design/react-native';

export default class Welcome extends Component {
  constructor(props) {
    super(props);

    this.onClose = () => {
      this.setState({
        visible: false,
      });
    };

    this.onButtonClick = () => {
      Modal.alert('Title', 'alert content', [
        {
          text: 'Cancel',
          onPress: () => console.log('cancel'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('ok') },
      ]);
    };

    this.state = {
      isLoading: true,
      dataSource: null,
      visible: false,
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

    const footerButtons = [
      { text: 'Cancel', onPress: () => console.log('cancel') },
      { text: 'Ok', onPress: () => console.log('ok') },
    ];

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="small" color="#00ff00" />
        </View>
      );
    } else {
      let obj = this.state.dataSource.map((val, key) => {
        return <TouchableOpacity key={key}

          onPress={() => this.setState({ visible: true })}
        >
          <View style={{ flex: 1, flexDirection: 'row', padding: 5 }}>
            <Image
              style={{ padding: 15, width: 50, height: 50, borderRadius: 50, overflow: 'hidden', borderWidth: 3, borderColor: 'black' }}
              source={{ uri: 'http://10.0.2.2:3000/' + val.image.replace(/\\/g, '/') }}
            />
            <View style={{ flex: 1, flexDirection: 'column', paddingStart: 10 }}>
              <Text>{val.name}</Text>
              <Text>{val.campus}</Text>

            </View>
          </View>
          <View
            style={{
              borderBottomColor: '#5e5e5e',
              borderBottomWidth: 1,
            }}
          />
        </TouchableOpacity>
      });

      const { navigate } = this.props.navigation;
      return (
        <Provider>
          <ScrollView
            style={{ flex: 1, backgroundColor: '#f5f5f9' }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >

            <Modal
              title="Editar Equipamento"
              transparent
              onClose={this.onClose}
              maskClosable
              visible={this.state.visible}
              closable
              footer={footerButtons}
            >
              <View style={{ paddingVertical: 20 }}>

                <Text style={{ textAlign: 'center' }}>Equipment:</Text>
                <InputItem
                  clear
                  defaultValue="Robot"
                />
                <Text style={{ textAlign: 'center' }}>Description:</Text>
                <InputItem
                  clear
                  defaultValue="Metal boxer"
                />
              </View>
            </Modal>

            <View
              style={{
                borderBottomColor: '#5e5e5e',
                borderBottomWidth: 1,
              }}
            />
            {obj}
            <Button onPress={() => navigate('Welcome', { name: 'Testing' })}>Go back</Button>

          </ScrollView>
        </Provider>
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
