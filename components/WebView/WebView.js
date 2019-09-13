import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, WebView, ScrollView, RefreshControl, Platform } from 'react-native';
import { ScreenOrientation } from 'expo';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../utils'

import { config } from "../../config/config";
import { useIsConnected } from '../../hooks';

const WebViewComponent = ({ navigation }) => {
  const isConnected  = useIsConnected(true);
  const [orientation, setOrientation]  = useState('PORTRAIT');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const webViewRef = useRef(null);

  useEffect(() => {
    if(!isConnected) {
      navigation.navigate('ConnectionScreen');
    }
  }, [isConnected, navigation]);

  function orientationListener ({ orientationInfo }) {
    setOrientation(orientationInfo.orientation)
    webViewRef.current.reload();
  }
  function onRefresh () {
    webViewRef.current.reload();
    setIsRefreshing(false);
  }

  useEffect( () => {
    const sub = ScreenOrientation.addOrientationChangeListener(orientationListener);
    return () => ScreenOrientation.removeOrientationChangeListener(sub)
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <WebView
        ref={webViewRef}
        source={{uri: `${config.url}${Platform.OS === 'ios' ? '?ios=true' : ''}`}}
        style={[
          orientation === 'PORTRAIT_UP' ?  styles.web : styles.landscapeWeb
          //styles.web,
        ]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  web: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    borderColor: 'black',
    borderWidth: 2
  },
  landscapeWeb: {
    width: WINDOW_HEIGHT,
    height: WINDOW_WIDTH,
  }
});


export { WebViewComponent as WebView };