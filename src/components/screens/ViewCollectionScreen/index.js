import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Layout,
  Text,
} from '@ui-kitten/components';
import { useIsFocused } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { setLastVisitedStart } from '../../../actions/appActions';
import { getViewsStart } from '../../../actions/viewActions';
import { getItemsStart } from '../../../actions/itemActions';
import ScreenSafeAreaView from '../../ScreenSafeAreaView';
import ViewFactory from '../../factories/ViewFactory';
import Navigation from './Navigation';

export default ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [viewId, setViewId] = useState(null);
  const collectionId = route.params.id;
  let view = null;
  const { workspace, collection, views, rehydrateItems } = useSelector((state) => {
    let currentCollection = null;
    const collections = state.collection.collections
    if (collections) {
      currentCollection = collections.find(col => col.id === collectionId);
    }

    return {
      workspace: state.workspace.workspace,
      collection: currentCollection,
      lastWorkspace: state.app.lastWorkspace,
      views: state.view.views,
      rehydrateItems: state.item.rehydrateItems,
    };
  });

  // on focus effect
  useEffect(() => {
    if (isFocused && collection) {
      dispatch(setLastVisitedStart({ collection: collectionId }));
      dispatch(getViewsStart(collectionId));
      dispatch(getItemsStart({ collectionId }));
    }
  }, [isFocused, collectionId, collection]);
  
  useEffect(() => {
    if (!viewId && views) {
      setViewId(views[0].id);
    }
  }, [views]);

  // items effect
  useEffect(() => {
    if (rehydrateItems) {
      dispatch(getItemsStart());
    }
  }, [rehydrateItems]);

  if (views) {
    view = views.find(view => view.id === viewId) || views[0];
  }

  if (!collection || !view) {
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
      <Navigation title={collection.name} />
      <Layout style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.text} category="h1">
              {collection.name}
            </Text>
          </View>
          <View>  
            <ViewFactory collection={collection} view={view} />
          </View>
      </Layout>
    </ScreenSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginLeft: 30
  },
  text: {
  },
  likeButton: {
    marginVertical: 16,
  },
});
