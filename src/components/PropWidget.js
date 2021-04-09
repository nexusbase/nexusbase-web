import React from 'react';
import collectionProps from '../constants/collectionProps';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Icon } from '@ui-kitten/components';

export default ({ collectionProp, focus }) => {
  const propData = collectionProps[collectionProp.type];
  const labelStyle = focus ? {...styles.label, ...styles.labelFocus} : styles.label;

  if (!propData) {
    throw new Error('Unkwon prop type:' + collectionProp.type);
  }

  const PropIcon = (props) => (
    <Icon {...props} name={propData.icon} />
  );

  return (
    <View style={styles.container}>
      <Button
        style={styles.iconButton}
        appearance='ghost'
        accessoryLeft={PropIcon}
      >
        <Text style={labelStyle}>{collectionProp.label}</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  label: {
    marginTop: 15,
    marginBottom: 10,
  },
  labelFocus: {
    color: 'blue'
  },
  iconButton: {
    paddingLeft: 0,
    marginBottom: 8,
  },
  icon: {
    width: 32,
    height: 32,
  },
});
