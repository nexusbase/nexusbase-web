import React from 'react';
import { Spinner } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import ListView from '../views/ListView';

export default () => {
  const { collection, view, items } = useSelector((state) => ({
    collection: state.collections.collection,
    view: state.views.view,
    items: state.items.items,
  }));

  if (!view) {
    return <Spinner />
  }

  const viewProps = { view, collection, items };

  switch (view.type) {
    case 'list':
      return <ListView {...viewProps} />
  
    default:
      throw new Error(`Unknown view type: ${view.type}`);
  }
}
