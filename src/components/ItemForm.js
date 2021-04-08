import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateItemStart } from '../actions/items';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Icon,
  Layout,
  Text,
} from '@ui-kitten/components';
import PropFactory from './factories/PropFactory';

function PropInput({ prop, item, update }) {
  const [focus, setFocus] = useState(false);
  const labelStyle = focus ? {...styles.label, ...styles.labelFocus} : styles.label;

  return (
    <View key={prop.id}>
      <Text style={labelStyle}>{prop.label}</Text>
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

export default function ItemForm({ collectionProps, item, setModified }) {
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
  label: {
    marginTop: 15,
    marginBottom: 10,
  },
  labelFocus: {
    color: 'blue'
  }
});
