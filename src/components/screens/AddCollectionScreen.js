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
import { createCollectionStart, getCollectionsStart } from '../../actions/collectionActions';

const StarIcon = (props) => (
  <Icon {...props} name='star'/>
);

export default ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const { newId, workspace } = useSelector((state) => ({
    workspace: state.workspace.workspace,
    newId: state.collection.newId,
  }));
  
  useEffect(() => {
    if(newId) {
      dispatch(getCollectionsStart());
      navigation.navigate('ViewCollection', {id: newId});
    }
  }, [newId]);

  const createCollection = () => {
    dispatch(createCollectionStart(
      {
        name,
        workspaceId: workspace.id
      }
    ));
  }

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
          onPress={createCollection}
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
