import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import AppNavigator from './AppNavigator';

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ApplicationProvider>
  </>
);
