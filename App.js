import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import colors from 'styles/constants/colors';

export default function App() {
  return (
    <View>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.white}
        translucent={false}
      />
    </View>
  );
}
