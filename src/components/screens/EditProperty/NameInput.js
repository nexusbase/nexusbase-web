import React, { useState } from 'react';
import { Input } from '@ui-kitten/components';

export default function ({value, updateProperty}) {
  const [name, setName] = useState(value);
  
  const onChangeText = nextValue => {
    setName(nextValue);
    // todo: debounce
    updateProperty({ name: nextValue });
  }

  return (
    <Input
        label='Property Name'
        placeholder='Property Name'
        value={name}
        onChangeText={onChangeText}
    />
  )
}