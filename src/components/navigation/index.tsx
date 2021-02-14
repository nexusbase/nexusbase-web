import React, { useEffect, useState } from 'react';
import routes from '../../constants/routes';
import { createStackNavigator } from '@react-navigation/stack';
import { Drawer, DrawerItem, Icon, Text } from '@ui-kitten/components';
import WorkspacesAdd from '../screens/WorkspacesAdd';
import Intro from '../screens/Intro';
import { useDispatch, useSelector } from 'react-redux';
import { getAppDataStart } from '../../actions/app';
import RootStore from '../../types/store/root';

export default () => { 
  const AppStack = createStackNavigator();
  const dispatch = useDispatch();
  const { dataLoaded, workspaces } = useSelector((state: RootStore) => ({
    dataLoaded: state.app.dataLoaded,
    workspaces: state.workspaces.workspaces,
  }));

  useEffect(() => {
    dispatch(getAppDataStart());
  }, [])

  useEffect(() => {
    if (!dataLoaded) {
      
    }
  }, [dataLoaded]);
  
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name={routes.Intro.name}
        component={Intro}
        options={{ title: 'Intro' }}
      />

      <AppStack.Screen
        name={routes.WorkspacesAdd.name}
        component={WorkspacesAdd}
        options={{ title: 'Add workspace' }}
      />
    </AppStack.Navigator>
  );
}
