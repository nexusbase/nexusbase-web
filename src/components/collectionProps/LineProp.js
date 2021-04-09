import React, {useState} from 'react';
import {Input, Text} from '@ui-kitten/components';

export default ({
  collectionProp,
  item,
  edit,
  onFocus,
  onBlur,
  update
}) => {
  const initialValue = item.props[collectionProp.id];
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
      placeholder={collectionProp.label}
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}
