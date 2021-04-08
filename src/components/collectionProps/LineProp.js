import React, { useState } from 'react';
import {Input, Text} from '@ui-kitten/components';

export default ({
  collectionProp,
  item,
  edit,
  onFocus,
  onBlur,
  update
}) => {
  const data = item.props[collectionProp.id];
  const [value, setValue] = useState(data);
  
  if (!edit) {
    return <Text>{data}</Text>;
  }

  const onChangeText = nextValue => {
    setValue(nextValue);
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
