import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Icon,
  Layout,
  Spinner,
  Text,
} from '@ui-kitten/components';
import ScreenSafeAreaView from '../ScreenSafeAreaView';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAppDataStart } from '../../actions/app';
import { getWorkspaceStart } from '../../actions/workspaces';
import { getCollectionsStart } from '../../actions/collections';

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

  useEffect(() => {
    dispatch(getAppDataStart());
  }, [])

  useEffect(() => {
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

    if (workspace && collections) {
      navigation.replace('Workspace', {
        screen: 'ViewCollection',
        params: {id: lastCollection}
      });
    } else {
      // fetch workspace and collections data
      if (workspace) {
        dispatch(getCollectionsStart());
      } else {
        dispatch(getWorkspaceStart(lastWorkspace));
      }
    }
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
