import React from 'react';
import routes from '../constants/routes';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, DrawerItem, Icon } from '@ui-kitten/components';
import WorkspacesAdd from './screens/Workspaces.add';

const WorkspaceDrawer = createDrawerNavigator();

const WorkspaceDrawerContent = ({ navigation, state }) => {
  const workspaceRoutes = [
    routes.WorkspacesAdd
  ];

  const createDrawerItem = (route, index) => {
    return (
      <DrawerItem
        key={index}
        title={route.name}
      />
    );
  };

  return (
    <Drawer
      data={workspaceRoutes.map(createDrawerItem)}
      onSelect={indexPath => navigation.navigate(workspaceRoutes[indexPath.row])}>
      {workspaceRoutes.map(createDrawerItem)}
    </Drawer>
  );
};

export default function() {
  return (
    <WorkspaceDrawer.Navigator drawerContent={props => <WorkspaceDrawerContent {...props} />}>
      <WorkspaceDrawer.Screen
        name={routes.WorkspacesAdd.name}
        component={WorkspacesAdd}
        options={{ title: 'Home', drawerIcon: <Icon name="star" /> }}
      />
    </WorkspaceDrawer.Navigator>
  );
}
