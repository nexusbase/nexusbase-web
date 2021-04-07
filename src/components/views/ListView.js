import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import {
  Button,
  Icon,
  Layout,
  Text,
  Spinner,
} from '@ui-kitten/components';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import PropWidget from '../PropWidget';
import PropFactory from '../factories/PropFactory';

export default ({ view, collection, items }) => {
  const viewProps = collection.props.filter(
    collectionProp => view.props.includes(collectionProp.id)
  );
  const widthArr = Array(viewProps.length + 1).fill(200);

  let headerRow = () => {
    let row = viewProps.map((prop) =>
      <PropWidget collectionProp={prop} />
    );
    row.push(
      <View>
        <Button>Add property</Button>
      </View>
    );

    return row;
  }

  const itemRow = (item) => {
    let row = viewProps.map((viewProp) =>
      <PropFactory collectionProp={viewProp} item={item} />
    );
    row.push()

    return row;
  }

  return (
    <ScrollView horizontal={true}>
      <View>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row
            data={headerRow()}
            widthArr={widthArr}
          />
        </Table>
        <ScrollView>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            {items ?
              Array(60).fill(items[0]).map(item =>
                <Row
                  key={item.id}
                  widthArr={widthArr}
                  data={itemRow(item)}
                />
              )
              :
              <Spinner />
            }
          </Table>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewHorizontal: {
    marginLeft: 50
  },
  text: {
  },
  likeButton: {
    marginVertical: 16,
  },
});
