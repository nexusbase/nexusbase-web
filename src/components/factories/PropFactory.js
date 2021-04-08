import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Text} from '@ui-kitten/components';
import LineProp from '../collectionProps/LineProp';

/*
Component props {
  collectionProp,
  item
  edit
}
*/
export default (props) => {
  switch (props.collectionProp.type) {
    case 'line':
      return <LineProp {...props} />
  
    default:
      return (
        <View>
          <Text>Caution</Text>
        </View>
      );
  }
}
