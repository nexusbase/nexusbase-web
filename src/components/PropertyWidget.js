import React from 'react';
import collectionPropsData from '../constants/properties';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Icon } from '@ui-kitten/components';
import { getPropertyFromCollection } from '../utils';

export default function({ collection, propertyId, focus }) {
  const navigation = useNavigation();
  const property = getPropertyFromCollection(propertyId, collection);
  const propConfig = collectionPropsData[property.type];
  const labelStyle = focus ? styles.labelFocus : {};

  if (!propConfig) {
    throw new Error('Unkwon prop type:' + property.type);
  }

  const PropIcon = (props) => (
    <Icon {...props} name={propConfig.icon} />
  );

  const handleOnPress = () => {
    /*
    navigation.push(
      'EditProp',
      {
        collectionId: collection.id,
        propertyId,
      }
    );
    */
  };

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        appearance='ghost'
        accessoryLeft={PropIcon}
        onPress={handleOnPress}
      >
        {evaProps =>
          <Text {...evaProps} style={labelStyle}>{property.label}</Text>
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
