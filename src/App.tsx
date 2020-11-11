import React from 'react';
import {StatusBar} from 'react-native';
import Navigator from 'react-native-easy-router';
import {Provider as PaperProvider} from 'react-native-paper';
import * as screens from './screens';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="rgba(0,0,0,0)" />
      <PaperProvider>
        <Navigator screens={screens} initialStack="Home" />
      </PaperProvider>
    </>
  );
};

export default App;
