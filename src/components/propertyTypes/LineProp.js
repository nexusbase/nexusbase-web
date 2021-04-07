import React, { FC } from 'react';
import {Text} from '@ui-kitten/components';

export default ({
  collectionProp,
  item,
  edit,
  style,
  onFocus,
  onBlur,
  update
}) => {
  const data = item.props[collectionProp.id];
  
  if (!edit) {
    return <Text>{data}</Text>;
  }
}
