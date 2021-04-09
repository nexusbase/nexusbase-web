import React, {useState} from 'react';
import {Input, Text} from '@ui-kitten/components';
import { getPropertyFromCollection } from '../../utils';

export default ({
  collection,
  propertyId,
  item,
  edit,
  onFocus,
  onBlur,
  update
}) => {
  const property = getPropertyFromCollection(propertyId, collection);
  const initialValue = item.properties[property.id];
  const [value, setValue] = useState(initialValue);
  
  if (!edit) {
    return <Text>{initialValue}</Text>;
  }

  const onChangeText = nextValue => {
    setValue(nextValue);
    // todo: debounce
    update(nextValue);
  }

  return (
    <Input
      placeholder={property.label}
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}
