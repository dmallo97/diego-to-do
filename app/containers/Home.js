import React, { useState, useContext, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { Modal, SafeAreaView, Text } from 'react-native';
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

const Home = ({ navigation }) => {
  const [addItemModalVisibility, setAddItemModalVisibility] = useState(false);
  const [signInModalVisibility, setSignInModalVisibility] = useState(false);
  const { accountStore } = useContext(MobxContext);
  useEffect(() => {
    if (!accountStore.userLoggedIn) {
      setSignInModalVisibility(true);
    } else {
      setSignInModalVisibility(false);
    }
  });

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
          data={
            accountStore.userLoggedIn ? accountStore.userLoggedIn.todoList : []
          }
          keyExtractor={(item, index) => `${item} ${index}`}
          renderItem={({ item }) => (
            <Item task={item} account={accountStore.userLoggedIn} />
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
