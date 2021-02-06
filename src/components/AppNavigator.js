import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, DrawerItem, Icon } from '@ui-kitten/components';
import Home from './screens/Home';
import About from './screens/About';

const WorkspaceDrawer = createDrawerNavigator();

const WorkspaceDrawerContent = ({ navigation, state }) => {
  const workspaceRoutes = [
    { name: 'HOME' },
    { name: 'ABOUT' },
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

export const WorkspaceNavigator = () => (
  <WorkspaceDrawer.Navigator drawerContent={props => <WorkspaceDrawerContent {...props} />}>
    <WorkspaceDrawer.Screen
      name={'HOME'}
      component={Home}
      options={{ title: 'Home', drawerIcon: <Icon name="star" /> }}
    />
    <WorkspaceDrawer.Screen
      name={'ABOUT'}
      component={About}
      options={{ title: 'About' }}
    />
  </WorkspaceDrawer.Navigator>
);

export default () => (
  <WorkspaceNavigator />
);
