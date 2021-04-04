import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, DrawerItem, Icon } from '@ui-kitten/components';
import ViewWorkspace from '../screens/ViewWorkspace';
import ViewCollection from '../screens/ViewCollection';
import { useSelector } from 'react-redux';

const WorkspaceDrawer = createDrawerNavigator();

const WorkspaceDrawerContent = ({ navigation, state }) => {
  const { workspace, collections } = useSelector((state) => ({
    workspace: state.workspaces.workspace,
    collections: state.collections.collections,
  }));

  const getRoutes = () => {
    let routes = [
      {
        name: 'ViewWorkspace',
        title: 'Workspace Home',
      }
    ];

    for (const collection of collections) {
      routes.push({
        name: 'ViewCollection',
        title: collection.name,
        params: {id: collection.id},
      });
    }

    return routes;
  }

  const createDrawerItem = (route, index) => {
    return (
      <DrawerItem
        key={index}
        title={route.title}
      />
    );
  };

  return (
    <Drawer
      data={getRoutes().map(createDrawerItem)}
      onSelect={indexPath => navigation.navigate(getRoutes()[indexPath.row])}>
      {getRoutes().map(createDrawerItem)}
    </Drawer>
  );
};

export default function() {
  return (
    <WorkspaceDrawer.Navigator drawerContent={props => <WorkspaceDrawerContent {...props} />}>
      <WorkspaceDrawer.Screen
        name={'ViewWorkspace'}
        component={ViewWorkspace}
        options={{ title: 'Home', drawerIcon: <Icon name="star" /> }}
      />
      <WorkspaceDrawer.Screen
        name={'ViewCollection'}
        component={ViewCollection}
        options={{ title: 'Collection', drawerIcon: <Icon name="star" /> }}
      />
    </WorkspaceDrawer.Navigator>
  );
}
