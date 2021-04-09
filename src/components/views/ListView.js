import React from 'react';
import {StyleSheet} from 'react-native';
import {Divider, List, ListItem} from '@ui-kitten/components';

export default ({ view, collection, items, openItem }) => {
  const renderItem = ({ item }) => (
    <ListItem
      title={item.properties[collection.titleProperty]}
      onPress={() => openItem(item.id)}
    />
  );

  return (
    <>
      <Divider />
      <List
        style={styles.container}
        data={items}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </>
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
