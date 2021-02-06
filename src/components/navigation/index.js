import React from 'react';
import routes from '../../constants/routes';
import { createStackNavigator } from '@react-navigation/stack';
import { Drawer, DrawerItem, Icon } from '@ui-kitten/components';
import WorkspacesAdd from '../screens/Workspaces.add';

export default () => {
  const AppStack = createStackNavigator();
  
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name={routes.WorkspacesAdd.name}
        component={WorkspacesAdd}
        options={{ title: 'Add workspace' }}
      />
    </AppStack.Navigator>
  );
}
