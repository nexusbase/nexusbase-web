import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Icon,
  Layout,
  Text,
} from '@ui-kitten/components';
import ScreenSafeAreaView from '../ScreenSafeAreaView';
import { getCollectionStart } from '../../actions/collections';
import { useIsFocused } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';

export default ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const collectionId = route.params.id;
  const { workspace, collection } = useSelector((state) => ({
    workspace: state.workspaces.workspace,
    collection: state.collections.collection,
  }));

  useEffect(() => {
    if (isFocused) {
      // todo load workspace data if not loaded
      console.log({collectionId})
      dispatch(getCollectionStart(collectionId));
    }
  }, [collectionId, isFocused]);

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
