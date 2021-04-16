import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from '../screens/LoadingScreen';
import IntroScreen from '../screens/IntroScreen';
import WorkspaceDrawerNavigator from './WorkspaceDrawerNavigator';
import AddWorkspaceScreen from '../screens/AddWorkspaceScreen';
import AddCollectionScreen from '../screens/AddCollectionScreen';
import ItemScreen from '../screens/ItemScreen';
import EditProperty from '../screens/EditProperty';

export default () => {
  const RootStack = createStackNavigator();
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Loading"
        component={LoadingScreen}
      />
      <RootStack.Screen
        name="Intro"
        component={IntroScreen}
      />
      <RootStack.Screen
        name="AddWorkspace"
        component={AddWorkspaceScreen}
      />
      <RootStack.Screen
        name="Workspace"
        component={WorkspaceDrawerNavigator}
      />
      <RootStack.Screen
        name="AddCollection"
        component={AddCollectionScreen}
      />
      <RootStack.Screen
        name="ViewItem"
        component={ItemScreen}
      />
      <RootStack.Screen
        name="EditProperty"
        component={EditProperty}
      />
    </RootStack.Navigator>
  );
}
