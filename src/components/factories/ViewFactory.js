import React, { useEffect } from 'react';
import { Spinner } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import ListView from '../views/ListView';
import { useNavigation } from '@react-navigation/core';

export default () => {
  const navigation = useNavigation();
  const { collection, view, items } = useSelector((state) => ({
    collection: state.collections.collection,
    view: state.views.view,
    items: state.items.items,
  }));

  const openItem = (itemId) => {
    navigation.push('ViewItem', {id: itemId});
  }

  /* dev: go straight to item
  useEffect(() => {
    if (items) {
       openItem(items[0].id);
    }
  }, [items]);
  //*/

  if (!view) {
    return <Spinner />
  }

  const viewProps = { view, collection, items, openItem };

  switch (view.type) {
    case 'list':
      return <ListView {...viewProps} />
  
    default:
      throw new Error(`Unknown view type: ${view.type}`);
  }
}
