import React from 'react';
import { Platform } from 'react-native';
import { SafeAreaView, StyleSheet } from 'react-native';
import TopNav from './TopNav';

export default ({ children }) => {
  const getStyles = () => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      return style.mobile;
    }

    return style.web;
  };
  
  return (
    <SafeAreaView style={getStyles()}>
      <TopNav />
      {children}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  mobile: {
    flex: 1,
  },
  web: {
  },
});
