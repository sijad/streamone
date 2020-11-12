import React from 'react';
import {StatusBar} from 'react-native';
import Navigator from 'react-native-easy-router';
import * as screens from './screens';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="rgba(0,0,0,0)" />
      <Navigator screens={screens} initialStack="Home" />
    </>
  );
};

export default App;
