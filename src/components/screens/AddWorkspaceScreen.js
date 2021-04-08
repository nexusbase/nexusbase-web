import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Icon,
  Input,
  Layout,
  Text,
} from '@ui-kitten/components';
import ScreenSafeAreaView from '../ScreenSafeAreaView';
import { useDispatch, useSelector } from 'react-redux';
import { createWorkspaceStart } from '../../actions/workspaces';

const StarIcon = (props) => (
  <Icon {...props} name='star'/>
);

export default ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const { newId, workspace } = useSelector((state) => ({
    newId: state.workspaces.newId,
  }));
  
  useEffect(() => {
    if(newId) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'ViewWorkspace', params: {id: newId} }],
      });
    }
  }, [newId]);

  return (
    <ScreenSafeAreaView>
      <Layout style={styles.container}>
        <Text style={styles.text} category="h1">
          Add workspace
        </Text>
        <Input
          placeholder='Place your Text'
          value={name}
          onChangeText={nextValue => setName(nextValue)}
        />
        <Button
          accessoryLeft={StarIcon}
          onPress={() => dispatch(createWorkspaceStart(name))}
        >Add</Button>
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
