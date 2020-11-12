import React from 'react';
import {StatusBar} from 'react-native';
import Navigator from 'react-native-easy-router';
import * as screens from './screens';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Navigator screens={screens} initialStack="Home" />
    </>
  );
};

export default App;
