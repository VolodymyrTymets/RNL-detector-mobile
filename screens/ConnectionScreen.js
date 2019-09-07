import React from 'react';
import { StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from 'react-navigation';
import { CheckConnection } from '../components';


class ConnectionScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: 'RLN Detector',
      headerStyle: styles.header,
      headerTitleStyle: {
        flex: 1,
        color: 'white',
        textAlign: 'center'
      }
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <CheckConnection navigation={navigation} />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: 'black',
    height: 40,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});



export { ConnectionScreen };