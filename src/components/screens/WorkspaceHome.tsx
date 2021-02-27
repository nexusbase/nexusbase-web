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
import { StackScreenProps } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { createWorkspacesStart, getWorkspaceStart } from '../../actions/workspaces';
import { RootStackParamList } from '../../types/navigation';
import { useIsFocused } from '@react-navigation/native';
import RootStore from '../../types/store/root'

const StarIcon = (props) => (
  <Icon {...props} name='star'/>
);

const LoadingIndicator = (props) => (
  <View style={props.style}>
    <Spinner size='small'/>
  </View>
);

type Props = StackScreenProps<RootStackParamList, 'WorkspaceHome'>;

export default ({ navigation, route }: Props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const isFocused = useIsFocused();
  const { workspace, isFetchingOne } = useSelector((state: RootStore) => ({
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
