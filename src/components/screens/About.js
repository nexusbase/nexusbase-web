import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
} from '@ui-kitten/components';
import ScreenSafeAreaView from '../ScreenSafeAreaView';

export default () => (
  <ScreenSafeAreaView>
    <Layout style={styles.container}>
      <Text style={styles.text} category="h1">
        About screen
      </Text>
    </Layout>
  </ScreenSafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
});
