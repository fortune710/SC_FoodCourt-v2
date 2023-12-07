import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, Page } from '../../components/Themed';
import { Link } from 'expo-router';

export default function TabOneScreen() {
  return (
    <Page style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Link style={{ color: "#fff" }} href="/home">Hello</Link>
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
