import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Icon,
  Input,
  Layout,
  List,
  ListItem,
  Spinner,
  Text,
} from '@ui-kitten/components';
import ScreenSafeAreaView from '../ScreenSafeAreaView';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkspaceStart } from '../../actions/workspaces';
import { useIsFocused } from '@react-navigation/native';
import { getCollectionsStart } from '../../actions/collections';

export default ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const isFocused = useIsFocused();
  const workspaceId = route.params.id;
  const { workspace, collections } = useSelector((state) => ({
    workspace: state.workspaces.workspace,
    collections: state.collections.collections,
  }));

  useEffect(() => {
    if (isFocused) {
      dispatch(getWorkspaceStart(workspaceId));
      dispatch(getCollectionsStart(workspaceId));
    }
  }, [isFocused]);

  if (!workspace) {
    return (
      <ScreenSafeAreaView>
        <Layout style={styles.container}>
          <Text style={styles.text} category="h1">
            Loading workspace...
          </Text>
        </Layout>
      </ScreenSafeAreaView>
    );
  }

  // todo: drop down menu with collectio options
  const renderItemAccessory = (props) => (
    <Button size='tiny'>Options</Button>
  );

  const renderItemIcon = (props) => (
    <Icon {...props} name='person'/>
  );

  const renderItem = ({ item: collection, index }) => (
    <ListItem
      title={collection.name}
      description={collection.description}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
      onPress={() => navigation.navigate('ViewCollection', {id: collection.id})}
    />
  );

  return (
    <ScreenSafeAreaView>
      <Layout style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text} category="h1">
            {workspace.name}
          </Text>
          <Button style={styles.addButton} onPress={() => navigation.push('AddCollection')}>Add collection</Button>
        </View>
        <List
          data={collections}
          renderItem={renderItem}
        />
      </Layout>
    </ScreenSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  addButton: {
    width: 200,
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
});
