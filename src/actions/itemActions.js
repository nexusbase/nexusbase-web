
export const createItemStart = (payload) => ({
  type: 'CREATE_ITEM_START',
  payload
});

export const createItemSuccess = (payload) => ({
  type: 'CREATE_ITEM_SUCCESS',
  payload
});

export const getFormItemStart = (payload) => ({
  type: 'GET_FORM_ITEM_START',
  payload
});

export const getFormItemSuccess = (payload) => ({
  type: 'GET_FORM_ITEM_SUCCESS',
  payload
});

export const getItemsStart = (payload) => ({
  type: 'GET_ITEMS_START',
  payload
});

export const getItemsSuccess = (payload) => ({
  type: 'GET_ITEMS_SUCCESS',
  payload
});

export const updateItemStart = (payload) => ({
  type: 'UPDATE_ITEM_START',
  payload
});

export const updateItemSuccess = () => ({
  type: 'UPDATE_ITEM_SUCCESS'
});

export const clearFormItem = (payload) => ({
  type: 'CLEAR_FORM_ITEM',
  payload
});
