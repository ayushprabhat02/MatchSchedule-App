import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Calendar from './src/components/Calendar';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Calendar />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
