import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, WebView, ScrollView, RefreshControl, Platform } from 'react-native';
import { ScreenOrientation } from 'expo';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../utils'

import { config } from "../../config/config";
import { useIsConnected } from '../../hooks';

const isPortrait = (orientation) => orientation.indexOf('PORTRAIT') !== -1;
const getWebViewUrl = (height, width) => `${config.url}${Platform.OS === 'ios' ? '/ios' : ''}?height=${height}&width=${width}`;

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
        source={{
          uri: isPortrait(orientation) ? getWebViewUrl(WINDOW_HEIGHT, WINDOW_WIDTH) : getWebViewUrl(WINDOW_WIDTH, WINDOW_HEIGHT)
        }}
        style={[isPortrait(orientation) ?  styles.web : styles.landscapeWeb]}
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
  },
  landscapeWeb: {
    width: WINDOW_HEIGHT,
    height: WINDOW_WIDTH,
  }
});


export { WebViewComponent as WebView };