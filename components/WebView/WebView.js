import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, WebView, ScrollView, RefreshControl } from 'react-native';
import { ScreenOrientation } from 'expo';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../utils'

import { config } from "../../config/config";
import { useIsConnected } from '../../hooks';

const WebViewComponent = ({ navigation }) => {
  const isConnected  = useIsConnected(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const webViewRef = useRef(null);

  useEffect(() => {
    if(!isConnected) {
      navigation.navigate('ConnectionScreen');
    }
  }, [isConnected, navigation]);

  function orientationListener () {
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
        source={{uri: config.url}}
        style={styles.web}
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
  }
});


export { WebViewComponent as WebView };