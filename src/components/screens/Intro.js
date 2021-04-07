import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Layout,
  Text,
} from '@ui-kitten/components';
import ScreenSafeAreaView from '../ScreenSafeAreaView';

export default ({ navigation }) => (
  <ScreenSafeAreaView>
    <Layout style={styles.container}>
      <Text style={styles.text} category="h1">
        Intro
      </Text>
      <View>  
      <Button onPress={() => navigation.push('AddWorkspace')}>
        Add workspace
      </Button>
      </View>
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
