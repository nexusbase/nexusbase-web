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

export default ({ navigation }) => {
  const dispatch = useDispatch();
  const { dataLoaded, lastWorkspace, workspaces } = useSelector((state) => ({
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
        navigation.replace('Workspace', {
          screen: 'ViewWorkspace',
          params: {id: lastWorkspace}
        });
      }
    }
  }, [dataLoaded]);

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
