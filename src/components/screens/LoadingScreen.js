import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Spinner,
  Text,
} from '@ui-kitten/components';
import ScreenSafeAreaView from '../ScreenSafeAreaView';
import { useDispatch, useSelector } from 'react-redux';
import { getAppDataStart } from '../../actions/app';
import { getWorkspaceStart } from '../../actions/workspaces';

export default ({ navigation }) => {
  const dispatch = useDispatch();
  const { dataLoaded, lastWorkspace, lastCollection, workspaces, workspace, collections } = useSelector((state) => ({
    dataLoaded: state.app.dataLoaded,
    lastWorkspace: state.app.lastWorkspace,
    lastCollection: state.app.lastCollection,
    workspaces: state.workspaces.workspaces,
    workspace: state.workspaces.workspace,
    collections: state.collections.collections,
  }));

  const nextScreen = () => {
    if (!dataLoaded) return;
    
    if (workspaces.length === 0) {
      navigation.replace('Intro');
      return;
    }
    
    if (!lastCollection) {
      if (lastWorkspace) {
        navigation.replace('Workspace', {
          screen: 'ViewWorkspace',
          params: {id: lastWorkspace}
        });
      }
      return;
    }

    if (workspace) {
      navigation.replace('Workspace', {
        screen: 'ViewCollection',
        params: {id: lastCollection}
      });
    } else {
      dispatch(getWorkspaceStart(lastWorkspace));
    }
  };

  useEffect(() => {
    dispatch(getAppDataStart());
  }, [])

  useEffect(() => {
    nextScreen();
  }, [dataLoaded, workspace, collections]);

  return (
    <ScreenSafeAreaView>
      <Layout style={styles.container}>
        <Text style={styles.text} category="h1">
          <Spinner size='giant'/>
          Loading app...
        </Text>
      </Layout>
    </ScreenSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
});
