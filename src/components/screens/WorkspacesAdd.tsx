import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Icon,
  Input,
  Layout,
  Text,
} from '@ui-kitten/components';
import ScreenSafeAreaView from '../ScreenSafeAreaView';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'src/types/navigation';

type Props = StackScreenProps<RootStackParamList, 'AddWorkspace'>;

export default ({ navigation }: Props) => {
  const [value, setValue] = React.useState('');

  return (
    <ScreenSafeAreaView>
      <Layout style={styles.container}>
        <Text style={styles.text} category="h1">
          Add workspace
        </Text>
        <Input
          placeholder='Place your Text'
          value={value}
          onChangeText={nextValue => setValue(nextValue)}
        />
      </Layout>
    </ScreenSafeAreaView>
  );
};

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
