import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddListItemModal from './containers/AddListItemModal';
import AddUserModal from './containers/AddUserModal';
import Home from './containers/Home';
import Users from './containers/Users';

const UsersStack = createStackNavigator();

function UsersStackScreen() {
  return (
    <UsersStack.Navigator mode="modal">
      <UsersStack.Screen
        name="UsersList"
        component={Users}
        options={{ headerShown: false }}
      />
      <UsersStack.Screen
        name="AddUserModal"
        component={AddUserModal}
        options={{ headerShown: false }}
      />
    </UsersStack.Navigator>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator mode="modal">
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="AddListItemModal"
        component={AddListItemModal}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const RootStackTab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStackTab.Navigator>
        <RootStackTab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{ headerShown: false }}
        />
        <RootStackTab.Screen
          name="Accounts"
          component={UsersStackScreen}
          options={{ headerShown: false }}
        />
      </RootStackTab.Navigator>
    </NavigationContainer>
  );
}