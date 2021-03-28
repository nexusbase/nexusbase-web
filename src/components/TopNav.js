import React from 'react';
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const BackIcon = (props) => (
  <Icon {...props} name='menu-outline'/>
);

const BackAction = () => {
  const navigate = useNavigation();
  
  return (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => navigate.openDrawer()}
    />
  );
}

const TopNav = () => {
  
  return (
    <TopNavigation
      accessoryLeft={BackAction}
      title='Eva Application'
    />
  );
}

export default TopNav;
