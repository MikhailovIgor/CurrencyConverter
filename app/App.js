import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider } from 'react-redux';
import store from './config/store';

import HomeStack from './config/routes';

EStyleSheet.build({
  $primaryBlue: '#4f6d7a',
  $primaryOrange: '#d57a66',
  $primaryGreen: '#00bd9d',
  $primaryPurple: '#9e768f',
  $white: '#fff',
  $border: '#e2e2e2',
  $inputText: '#797979',
  $lightGray: '#f0f0f0',
  $darkText: '#343434',
});

export default () => {
  return (
      <Provider store={store}>
        <NavigationContainer>
          <HomeStack />
        </NavigationContainer>
      </Provider>

  );
};
