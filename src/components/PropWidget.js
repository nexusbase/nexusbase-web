import React from 'react';
import collectionProps from '../constants/collectionProps';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Icon } from '@ui-kitten/components';

export default ({ collectionProp, focus }) => {
  const propData = collectionProps[collectionProp.type];
  const labelStyle = focus ? styles.labelFocus : {};

  if (!propData) {
    throw new Error('Unkwon prop type:' + collectionProp.type);
  }

  const PropIcon = (props) => (
    <Icon {...props} name={propData.icon} />
  );

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        appearance='ghost'
        accessoryLeft={PropIcon}
      >
        {evaProps =>
          <Text {...evaProps} style={labelStyle}>{collectionProp.label}</Text>
        }
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  button: {
    paddingLeft: 0,
    marginBottom: 8,
    marginTop: 4,
  },
  icon: {
    width: 32,
    height: 32,
  },
  labelFocus: {
    color: 'blue'
  },
});
