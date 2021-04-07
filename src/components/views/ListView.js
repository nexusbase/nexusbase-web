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
import FieldWidget from '../FieldWidget';
import FieldFactory from '../factories/FieldFactory';

export default ({ view, collection, items }) => {
  const viewFields = collection.fields.filter(
    collectionField => view.fields.includes(collectionField.id)
  );

  return (
    <ScrollView>
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row
            data={viewFields.map((viewField) =>
              <FieldWidget field={viewField} />
            )}
          />
          {items ?
            items.map(item =>
              <Row
                data={viewFields.map((viewField) =>
                  <FieldFactory field={viewField} item={item} />
                )}
              />
            )
            :
            <Spinner />}
        </Table>
    </ScrollView>
  );
}
