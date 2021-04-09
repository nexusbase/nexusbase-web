import React from 'react';
import { View } from 'react-native';
import {Text} from '@ui-kitten/components';
import LineProperty from '../properties/LineProperty';
import { getPropertyFromCollection } from '../../utils';

/*
Component props {
  collectionProp,
  item
  edit
}
*/
export default (props) => {
  const property = getPropertyFromCollection(props.propertyId, props.collection);

  switch (property.type) {
    case 'line':
      return <LineProperty {...props} />
  
    default:
      return (
        <View>
          <Text>Caution</Text>
        </View>
      );
  }
}
