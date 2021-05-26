import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './containers/Home';
import Users from './containers/Users';

const UsersStack = createStackNavigator();

function UsersStackScreen() {
  return (
    <UsersStack.Navigator>
      <UsersStack.Screen
        name="UsersList"
        component={Users}
        options={{ headerShown: false }}
      />
    </UsersStack.Navigator>
  );
}

const RootStackTab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStackTab.Navigator>
        <RootStackTab.Screen
          name="Inicio"
          component={Home}
          options={{ headerShown: false }}
        />
        <RootStackTab.Screen
          name="Usuarios"
          component={UsersStackScreen}
          options={{ headerShown: false }}
        />
      </RootStackTab.Navigator>
    </NavigationContainer>
  );
}
