import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {updateItemStart} from '../actions/items';
import { StyleSheet, View } from 'react-native';
import PropFactory from './factories/PropFactory';
import PropWidget from './PropWidget';
import { Spinner } from '@ui-kitten/components';

function PropInput({ prop, item, update }) {
  const [focus, setFocus] = useState(false);

  return (
    <View key={prop.id}>
      <PropWidget
        collectionProp={prop}
        focus={focus}
      />
      <PropFactory
        edit
        collectionProp={prop}
        item={item}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        update={update}
      />
    </View>
  )
}

export default function ItemForm({ collectionProps, item }) {
  const dispatch = useDispatch();
  const updateProp = (propId, value) => {
    const updatedProps = {[propId]: value};
    dispatch(updateItemStart(
      {
        id: item.id,
        props: updatedProps
      }
    ));
  };

  if (!collectionProps || !item) {
    return (
      <View style={styles.loading}>
        <Spinner size='giant' />
      </View>
    )
  }

  return (
    <View>
      {collectionProps.map(prop =>
        <PropInput
          key={prop.id}
          prop={prop}
          item={item}
          update={nextValue => updateProp(prop.id, nextValue)}
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
