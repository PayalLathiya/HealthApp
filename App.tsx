import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import Routine from './src/screens/routine';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.container}>
          <Routine />
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
