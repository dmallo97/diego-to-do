import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import { Modal, SafeAreaView } from 'react-native';
import styled from 'styled-components';

import Item from '../components/Item';
import colors from '../styles/constants/Colors';
import AddListItemModal from './AddListItemModal';

const toDoItemsSample = ['Run errands', 'Groceries', 'Go shopping'];

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

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView>
      <Container>
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <AddListItemModal setModalVisibility={setModalVisible} />
        </Modal>
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
        <AddItemButton onPress={() => setModalVisible(true)}>
          <AddItemButtonInnerText>Add new item</AddItemButtonInnerText>
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

export default Home;
