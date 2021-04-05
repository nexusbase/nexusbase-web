import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Icon,
  Layout,
  Text,
} from '@ui-kitten/components';
import ScreenSafeAreaView from '../ScreenSafeAreaView';
import { useIsFocused } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkspaceStart } from '../../actions/workspaces';
import { getCollectionStart } from '../../actions/collections';

export default ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const collectionId = route.params.id;
  const { workspace, collection, lastWorkspace } = useSelector((state) => ({
    workspace: state.workspaces.workspace,
    collection: state.collections.collection,
    lastWorkspace: state.app.lastWorkspace
  }));

  useEffect(() => {
    if (isFocused) {
      if (workspace) {
        dispatch(getCollectionStart(collectionId));
      } else {
        dispatch(getWorkspaceStart(lastWorkspace));
      }
    }
  }, [collectionId, isFocused, workspace]);

  if (!collection) {
    return (
      <ScreenSafeAreaView>
        <Layout style={styles.container}>
          <Text style={styles.text} category="h1">
            Loading collection...
          </Text>
        </Layout>
      </ScreenSafeAreaView>
    );
  }

  return (
    <ScreenSafeAreaView>
      <Layout style={styles.container}>
        <Text style={styles.text} category="h1">
          {collection.name}
        </Text>
        <View>  
          <Text>List</Text>
        </View>
      </Layout>
    </ScreenSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
  },
  likeButton: {
    marginVertical: 16,
  },
});
