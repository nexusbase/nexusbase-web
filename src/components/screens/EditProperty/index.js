import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { updatePropertyStart } from '../../../actions/collectionActions';
import { getPropertyFromCollection } from '../../../utils';
import { StyleSheet, View } from 'react-native';
import {
  Input,
  Layout,
  Spinner,
} from '@ui-kitten/components';
import ScreenSafeAreaView from '../../ScreenSafeAreaView';
import Navigation from './Navigation';
import NameInput from './NameInput';

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
  const [property, setProperty] = useState(null);
  const { collectionId, propertyId } = route.params;
  const { collections } = useSelector((state) => ({
    collections: state.collection.collections,
  }));

  const collection = collections.find(collection => collection.id === collectionId);
  
  useEffect(() => {
    if (isFocused && collection) {
      const property = getPropertyFromCollection(propertyId, collection);
      // todo: property not found
      setProperty(property);
    }
  }, [isFocused, collection]);

  const updateProperty = data => {
    dispatch(updatePropertyStart(
      {
        collectionId: collectionId,
        propertyId: property.id,
        data,
      }
    ));
  }

  if (!property) {
    return (
      <Container><Spinner size='giant' /></Container>
    )
  }

  return (
    <Container>
      <NameInput value={property.name} updateProperty={updateProperty} />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
