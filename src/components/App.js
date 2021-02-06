import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { ApplicationProvider as KittenAppProvider, IconRegistry } from '@ui-kitten/components';
import { Provider as ReduxProvider } from 'react-redux';
import AppNavigator from './navigation';
import store from '../services/reduxStore';

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <KittenAppProvider {...eva} theme={eva.light}>
      <ReduxProvider store={store}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ReduxProvider>
    </KittenAppProvider>
  </>
);
