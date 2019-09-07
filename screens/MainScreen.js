import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { WebView } from '../components';
import { SafeAreaView } from 'react-navigation';


class MainScreen extends React.Component {
  static navigationOptions = () => {
    return {
      headerLeft: null,
      headerStyle: styles.header,
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <WebView navigation={navigation} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    height: 5,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});



export { MainScreen };