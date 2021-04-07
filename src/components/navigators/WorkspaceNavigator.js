import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, DrawerItem, Icon } from '@ui-kitten/components';
import ViewWorkspace from '../screens/ViewWorkspace';
import ViewCollection from '../screens/ViewCollection';
import { useDispatch, useSelector } from 'react-redux';
import { getCollectionsStart } from '../../actions/collections';

const WorkspaceDrawer = createDrawerNavigator();

const WorkspaceDrawerContent = ({ navigation, state }) => {
  const dispatch = useDispatch();
  const { workspace, collections } = useSelector((state) => ({
    workspace: state.workspaces.workspace,
    collections: state.collections.collections,
  }));

  useEffect(() => {
    if (!collections) {
      dispatch(getCollectionsStart());
    }
  }, [workspace, collections]);

  const getRoutes = () => {
    if (!workspace || !collections) {
      return [
        {
          name: 'ViewWorkspace',
          data: {
            title: 'Workspace Home',
          },
        }
      ];
    }

    let routes = [
      {
        name: 'ViewWorkspace',
        params: {id: workspace.id},
        data: {
          title: 'Workspace Home',
        },
      }
    ];

    for (const collection of collections) {
      routes.push({
        name: 'ViewCollection',
        params: {id: collection.id},
        data: {
          title: collection.name,
        },
      });
    }

    return routes;
  }

  const createDrawerItem = (route, index) => {
    return (
      <DrawerItem
        key={index}
        title={route.data.title}
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
