import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Icon,
  Layout,
  Text,
} from '@ui-kitten/components';
import ScreenSafeAreaView from '../ScreenSafeAreaView';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAppDataStart } from '../../actions/app';
import RootStore from '../../types/store/root'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'src/types/navigation';

type Props = StackScreenProps<RootStackParamList, 'Intro'>;

export default ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const { dataLoaded, lastWorkspace, workspaces } = useSelector((state: RootStore) => ({
    dataLoaded: state.app.dataLoaded,
    lastWorkspace: state.app.lastWorkspace,
    workspaces: state.workspaces.workspaces,
  }));

  useEffect(() => {
    dispatch(getAppDataStart());
  }, [])

  useEffect(() => {
    if (dataLoaded) {
      if (workspaces.length === 0) {
        navigation.replace('Intro');
      } else {
        navigation.replace('WorkspaceHome', {id: lastWorkspace})
      }
    }
  }, [dataLoaded]);

  return (
    <ScreenSafeAreaView>
      <Layout style={styles.container}>
        <Text style={styles.text} category="h1">
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
