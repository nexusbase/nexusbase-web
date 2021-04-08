import React, {useEffect} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Button, Divider, List, ListItem, Spinner} from '@ui-kitten/components';
import {Table, Row} from 'react-native-table-component';
import PropWidget from '../PropWidget';
import PropFactory from '../factories/PropFactory';

export default ({ view, collection, items, openItem }) => {
  const renderItem = ({ item, index }) => (
    <ListItem
      title={item.props[collection.titleProp]}
      onPress={() => openItem(item.id)}
    />
  );

  return (
    <List
      style={styles.container}
      data={items}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20
  },
  text: {
  },
  likeButton: {
    marginVertical: 16,
  },
});
