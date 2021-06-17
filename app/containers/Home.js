import React, { useState, useContext, useEffect } from 'react';

import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { Modal, SafeAreaView, Text } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import styled from 'styled-components';

import Item from '../components/Item';
import { MobxContext } from '../models/Root';
import colors from '../styles/constants/Colors';
import AddListItemModal from './AddListItemModal';
import ForcedSignInModal from './ForcedSignInModal';

const ToDoList = styled.FlatList`
  padding: 10px;
`;

const Container = styled.View`
  display: flex;
  background-color: ${colors.white};
  flex-direction: column;
  padding: 10px;
  height: 100%;
`;

const AddItemButton = styled.Pressable`
  background-color: ${colors.iosBlue};
  border-radius: 10px;
  padding: 10px;
  min-width: 70%;
  align-items: center;
`;

const AddItemButtonInnerText = styled.Text`
  color: ${colors.white};
  font-size: 20px;
`;

const DeleteActionView = styled.View`
  background-color: ${colors.iosRed};
  padding: 15px;
  justify-content: center;
  display: flex;
  flex-direction: row;
`;

const DeleteActionText = styled.Text`
  color: ${colors.white};
  font-weight: bold;
`;

const Home = ({ navigation }) => {
  const [addItemModalVisibility, setAddItemModalVisibility] = useState(false);
  const [signInModalVisibility, setSignInModalVisibility] = useState(false);
  const { accountStore } = useContext(MobxContext);
  const [todoListData, setTodoListData] = useState(
    accountStore.userLoggedIn?.todoList
  );
  const [listRefreshing, setListRefreshing] = useState(false);

  useEffect(() => {
    if (!accountStore.userLoggedIn) {
      setSignInModalVisibility(true);
    } else {
      setSignInModalVisibility(false);
    }
  });

  const handleRefresh = () => {
    setListRefreshing(true);
    accountStore.userLoggedIn.fetchTodos();
    setTodoListData(accountStore.userLoggedIn.todoList);
    setListRefreshing(false);
  };

  useEffect(
    () => () => {
      setSignInModalVisibility(false);
      handleRefresh();
    },
    []
  );

  const DeleteAction = () => (
    <DeleteActionView>
      <FontAwesome5 name="trash" size={20} color="white" />
      <DeleteActionText>Delete</DeleteActionText>
    </DeleteActionView>
  );

  const DeleteTask = (item) => {
    console.log('removing todo');
    accountStore.userLoggedIn.removeTodo(item);
    console.log('todo should be deleted');
  };

  console.log('Rendering Home');
  return (
    <SafeAreaView>
      <Container>
        <Modal
          animationType="slide"
          transparent
          visible={addItemModalVisibility}
          onRequestClose={() => {
            setAddItemModalVisibility(!addItemModalVisibility);
          }}
        >
          <AddListItemModal setModalVisibility={setAddItemModalVisibility} />
        </Modal>
        <Modal
          visible={signInModalVisibility}
          transparent={false}
          animationType="fade"
        >
          <ForcedSignInModal
            setModalVisibility={setSignInModalVisibility}
            navigation={navigation}
          />
        </Modal>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.white}
          translucent={false}
        />
        <ToDoList
          data={todoListData}
          refreshing={listRefreshing}
          onRefresh={handleRefresh}
          keyExtractor={(item, index) => `${item} ${index}`}
          renderItem={({ item }) => (
            <Swipeable
              renderRightActions={DeleteAction}
              onSwipeableRightOpen={() => DeleteTask(item)}
            >
              <Item task={item} account={accountStore.userLoggedIn} />
            </Swipeable>
          )}
          ListEmptyComponent={() => (
            <Text>
              Nothing to do. You&apos;re already up to date! Add a task below.
            </Text>
          )}
        />
        <AddItemButton onPress={() => setAddItemModalVisibility(true)}>
          <AddItemButtonInnerText>Add new task</AddItemButtonInnerText>
        </AddItemButton>
      </Container>
    </SafeAreaView>
  );
};

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default observer(Home);
