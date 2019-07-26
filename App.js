/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import Navigation from './src/screens/navigation'


const App = () => {
  return (
    <Fragment>
      <Navigation />
    </Fragment>
  );
};

const styles = StyleSheet.create({
});

export default App;
