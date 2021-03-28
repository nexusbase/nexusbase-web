import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Icon,
  Input,
  Layout,
  Spinner,
  Text,
} from '@ui-kitten/components';
import ScreenSafeAreaView from '../ScreenSafeAreaView';
import { useDispatch, useSelector } from 'react-redux';
import { createWorkspacesStart, getWorkspaceStart } from '../../actions/workspaces';
import { useIsFocused } from '@react-navigation/native';

const StarIcon = (props) => (
  <Icon {...props} name='star'/>
);

const LoadingIndicator = (props) => (
  <View style={props.style}>
    <Spinner size='small'/>
  </View>
);

export default ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const isFocused = useIsFocused();
  const { workspace, isFetchingOne } = useSelector((state) => ({
    workspace: state.workspaces.workspace,
    isFetchingOne: state.workspaces.isFetchingOne,
    isNew: state.workspaces.isNew,
  }));
  console.log({isFetchingOne})

  useEffect(() => {
    if (isFocused) {
      dispatch(getWorkspaceStart(route.params.id));
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

  return (
    <ScreenSafeAreaView>
      <Layout style={styles.container}>
        <Text style={styles.text} category="h1">
          Workspace Home
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
