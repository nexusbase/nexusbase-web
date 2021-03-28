import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '../screens/Loading';
import Intro from '../screens/Intro';
import AddWorkspace from '../screens/AddWorkspace';
import WorkspaceHome from '../screens/WorkspaceHome';

export default () => {
  const RootStack = createStackNavigator();
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Loading"
        component={Loading}
      />
      <RootStack.Screen
        name="Intro"
        component={Intro}
      />
      <RootStack.Screen
        name="AddWorkspace"
        component={AddWorkspace}
        options={{ title: 'Add workspace' }}
      />
      <RootStack.Screen
        name="WorkspaceHome"
        component={WorkspaceHome}
      />
    </RootStack.Navigator>
  );
}
