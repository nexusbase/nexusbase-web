import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  Icon,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

export default function Navigation({ collectionId, propertyId }) {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => setMenuVisible(!menuVisible);
  const handleDelete = () => {
    console.log({ delete: { collectionId, propertyId }})
    /* todo:
    delete prop
    check if delete was successful
    navigate back
    */
  };

  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back'/>
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
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem
          accessoryLeft={InfoIcon}
          title='Delete'
          onPress={handleDelete}
        />
      </OverflowMenu>
    </>
  );

  return (
    <TopNavigation
      alignment='center'
      title='Edit Collection'
      accessoryLeft={renderBackAction}
      accessoryRight={renderNavRightActions}
    />
  )
}
