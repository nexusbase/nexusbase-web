import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Drawer, DrawerItem, Icon, Text } from '@ui-kitten/components';
import Loading from '../screens/Loading';
import Intro from '../screens/Intro';
import WorkspacesAdd from '../screens/WorkspacesAdd';
import { RootStackParamList } from 'src/types/navigation';

export default () => {
  const RootStack = createStackNavigator<RootStackParamList>();
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
        component={WorkspacesAdd}
        options={{ title: 'Add workspace' }}
      />
    </RootStack.Navigator>
  );
}
