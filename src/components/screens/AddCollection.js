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
import { createCollectionStart } from '../../actions/collections';

const StarIcon = (props) => (
  <Icon {...props} name='star'/>
);

export default ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const { newId, workspace } = useSelector((state) => ({
    workspace: state.workspaces.workspace,
    newId: state.collections.newId,
  }));
  
  useEffect(() => {
    if(newId) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'ViewCollection', params: {id: newId} }],
      });
    }
  }, [newId]);

  return (
    <ScreenSafeAreaView>
      <Layout style={styles.container}>
        <Text style={styles.text} category="h1">
          Add collection
        </Text>
        <Input
          placeholder='Place your Text'
          value={name}
          onChangeText={nextValue => setName(nextValue)}
        />
        <Button
          accessoryLeft={StarIcon}
          onPress={() => dispatch(createCollectionStart(name))}
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
