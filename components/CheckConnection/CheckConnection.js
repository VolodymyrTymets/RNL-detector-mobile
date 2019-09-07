import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useIsConnected } from '../../hooks'

const CheckConnection = ({ navigation }) => {
  const isConnected  = useIsConnected(false);

  useEffect(() => {
    if(isConnected) {
      navigation.navigate('MainScreen');
    }
  }, [isConnected, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>RLN detector</Text>
      <Text style={styles.subheader}>Ідентифікація...</Text>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>
        Будь ласка підключіться до мережі <Text style={styles.bold}>RLN</Text> та переконайтеся у тому що мобільні дані виключені.
        Пароль: <Text style={[styles.bold, styles.italic]}>raspi12345</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    lineHeight: 26,
    marginBottom: 20,
  },
  subheader: {
    color: '#CFCFCF',
    fontSize: 16,
    lineHeight: 18,
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    lineHeight: 20,
    marginHorizontal: 20,
    marginTop: 30,
    color: "#ed5107"
  },
  bold: {
    fontWeight: '600',
  },
  italic: {
    fontStyle: 'italic',
  }
});


export { CheckConnection };