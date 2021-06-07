/* eslint-disable import/named */
import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddListItemModal from './containers/AddListItemModal';
import AddUserModal from './containers/AddUserModal';
import Home from './containers/Home';
import Users from './containers/Users';
import { MobxContext, RootStore } from './models/Root';
import colors from './styles/constants/Colors';

const UsersStack = createStackNavigator();
const Store = RootStore.create({});

function UsersStackScreen() {
  return (
    <UsersStack.Navigator>
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
    <MobxContext.Provider value={Store}>
      <NavigationContainer>
        <RootStackTab.Navigator
          screenOptions={({ route }) => ({
            // eslint-disable-next-line react/prop-types
            tabBarIcon: ({ focused, color }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
              } else if (route.name === 'Accounts') {
                iconName = focused ? 'people' : 'people-outline';
              }

              return <Ionicons name={iconName} size={25} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: colors.iosBlue,
            inactiveTintColor: 'gray',
          }}
        >
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
    </MobxContext.Provider>
  );
}
