import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { updateCollectionStart } from '../../../actions/collectionActions';
import { getPropertyFromCollection } from '../../../utils';
import { StyleSheet, View } from 'react-native';
import {
  Input,
  Layout,
  Spinner,
} from '@ui-kitten/components';
import ScreenSafeAreaView from '../../ScreenSafeAreaView';
import Navigation from './Navigation';

function Container({children}) {
  return (
    <ScreenSafeAreaView>
      <Navigation />
      <Layout style={styles.container}>
        {children}
      </Layout>
    </ScreenSafeAreaView>
  );
}

export default ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [collection, setCollection] = useState(null);
  const collectionId = route.params.id;
  const { collections } = useSelector((state) => ({
    collections: state.collection.collections,
  }));

  const initialCollection = collections.find(collection => collection.id === collectionId);
  
  useEffect(() => {
    setCollection(initialCollection);
  }, [isFocused, initialCollection]);

  if (!collection) {
    return (
      <Container><Spinner size='giant' /></Container>
    )
  }

  const update = updatedDetails => {
    setCollection({ ...collection, ...updatedDetails });
    dispatch(updateCollectionStart(
      {
        id: collection.id,
        details: updatedDetails,
      }
    ));
  }

  return (
    <Container>
      <Input
        label='Collection Name'
        placeholder='Collection Name'
        value={collection.name}
        onChangeText={nextValue => update({ name: nextValue })}
        style={styles.input}
        />
      <Input
        label='Description'
        placeholder='Description'
        value={collection.description}
        onChangeText={nextValue => update({ description: nextValue })}
        style={styles.input}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 20,
  },
});
