import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  Icon,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

export default function Navigation() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => setMenuVisible(!menuVisible);

  const DrawerIcon = (props) => (
    <Icon {...props} name='menu'/>
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

  const renderDrawerAction = () => (
    <TopNavigationAction
      icon={DrawerIcon}
      onPress={() => navigation.openDrawer()}
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
      accessoryLeft={renderDrawerAction}
      accessoryRight={renderNavRightActions}
    />
  )
}
