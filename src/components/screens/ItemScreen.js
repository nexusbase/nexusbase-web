import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { getFormItemStart, clearFormItem } from '../../actions/items';
import { StyleSheet, View } from 'react-native';
import {
  Icon,
  Layout,
  MenuItem,
  OverflowMenu,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import ScreenSafeAreaView from '../ScreenSafeAreaView';
import ItemForm from '../ItemForm';

function Navigation() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => setMenuVisible(!menuVisible);

  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back'/>
  );
  
  const ShareIcon = (props) => (
    <Icon {...props} name='share'/>
  );

  const MenuIcon = (props) => (
    <Icon {...props} name='more-vertical'/>
  );

  const InfoIcon = (props) => (
    <Icon {...props} name='info'/>
  );

  const renderBackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => navigation.goBack()}
    />
  );

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
  );

  const renderNavRightActions = () => (
    <>
      <TopNavigationAction
        icon={ShareIcon}
        onPress={() => {}}
      />
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={InfoIcon} title='About'/>
      </OverflowMenu>
    </>
  );

  return (
    <TopNavigation
      alignment='center'
      title='Edit Item'
      accessoryLeft={renderBackAction}
      accessoryRight={renderNavRightActions}
    />
  )
}

export default ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const itemId = route.params.id;
  const { collections, item } = useSelector((state) => ({
    collections: state.collections.collections,
    item: state.items.form[itemId],
  }));

  useEffect(() => {
    if(isFocused) {
      dispatch(getFormItemStart(itemId));
    }

    return () => dispatch(clearFormItem(itemId))
  }, [isFocused]);

  const getCollection = () => collections.find(collection => collection.id === item.collectionId);

  return (
    <ScreenSafeAreaView>
      <Navigation />
      <Layout style={styles.container}>
        <ItemForm collectionProps={item ? getCollection().props : null} item={item} />
      </Layout>
    </ScreenSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginLeft: 30
  },
  text: {
  },
  likeButton: {
    marginVertical: 16,
  },
});
