import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Icon,
  Layout,
  Text,
} from '@ui-kitten/components';
import ScreenSafeAreaView from '../ScreenSafeAreaView';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAppDataStart } from '../../actions/app';
import RootStore from '../../types/store/root'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'src/types/navigation';

type Props = StackScreenProps<RootStackParamList, 'Intro'>;

export default ({ navigation }: Props) => (
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
