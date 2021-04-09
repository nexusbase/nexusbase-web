import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {updateItemStart} from '../actions/itemActions';
import { StyleSheet, View } from 'react-native';
import PropertyFactory from './factories/PropertyFactory';
import PropertyWidget from './PropertyWidget';
import { Spinner } from '@ui-kitten/components';

function PropInput({ collection, propertyId, item, update }) {
  const [focus, setFocus] = useState(false);

  return (
    <View>
      <PropertyWidget
        collection={collection}
        propertyId={propertyId}
        focus={focus}
      />
      <PropertyFactory
        edit
        collection={collection}
        propertyId={propertyId}
        item={item}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        update={update}
      />
    </View>
  )
}

export default function({ collection, item }) {
  const dispatch = useDispatch();
  const updateProperties = (propertyId, value) => {
    const updatedProperties = {[propertyId]: value};
    dispatch(updateItemStart(
      {
        id: item.id,
        properties: updatedProperties
      }
    ));
  };

  if (!collection || !item) {
    return (
      <View style={styles.loading}>
        <Spinner size='giant' />
      </View>
    )
  }

  return (
    <View>
      {collection.properties.map(property =>
        <PropInput
          key={property.id}
          propertyId={property.id}
          collection={collection}
          item={item}
          update={nextValue => updateProperties(property.id, nextValue)}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    paddingTop: 100,
  },
});
