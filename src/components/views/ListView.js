import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, List, ListItem, Text} from '@ui-kitten/components';

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
      {items.length ?
        <List
          style={styles.container}
          data={items}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
        :
        <View style={styles.noItemsContainer}>
          <Text>No items found</Text>
        </View>
      }
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
  noItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 30,
  },
});
