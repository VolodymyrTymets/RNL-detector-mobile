import { useState, useEffect } from 'react';
import { config } from '../config/config'

/**
 * Provide hook to if connected to network.
 * */

function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}

const useIsConnected = (initialValue = false) => {
  const [isConnected, setIsConnected] = useState(initialValue);
  useEffect(() => {
    const interval = setInterval(() => {
      timeout(config.interval / 2, fetch(`${config.url}/api/v1/ping`))
        .then((response) => setIsConnected(true))
        .catch(() => setIsConnected(false));

    }, config.interval);
    return () => clearInterval(interval);
  }, []);

  return isConnected;
};

export { useIsConnected };
