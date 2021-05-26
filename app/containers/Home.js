import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components';

import Item from '../components/Item';
import colors from '../styles/constants/Colors';

const toDoItemsSample = ['Run errands', 'Groceries', 'Go shopping'];

const ToDoList = styled.FlatList`
  padding: 10px;
  background-color: white;
  padding-left: 40px;
`;

const AddItemButton = styled.Button`
  padding: 10px;
  background-color: ${colors.iosBlue};
  color: ${colors.white};
  align-self: flex-end;
`;

const Container = styled.View`
  display: flex;
  background-color: ${colors.white};
  flex-direction: column;
  padding: 10px;
  height: 100%;
`;

const Home = () => (
  <SafeAreaView>
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.white}
        translucent={false}
      />
      <ToDoList
        data={toDoItemsSample}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Item description={item} />}
      />
      <AddItemButton title="Add item" onPress={() => {}} />
    </Container>
  </SafeAreaView>
);

export default Home;
