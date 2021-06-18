import React, { useContext, useState } from 'react';

import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { Alert, Button } from 'react-native';
import styled from 'styled-components';

import { MobxContext } from '../models/Root';
import colors from '../styles/constants/Colors';

const ModalCard = styled.View`
  background-color: ${colors.white};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 35px;
  border-radius: 10px;
  shadow-color: ${colors.black};
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
  width: 100%;
`;

const SafeAreaContent = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

const ModalText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const ModalInput = styled.TextInput`
  color: grey;
  border-width: 1px;
  border-color: grey;
  margin: 10px;
  border-radius: 5px;
  padding: 5px;
`;

const InputLabel = styled.Text`
  font-size: 18px;
  color: ${colors.descriptionDarkerGrey};
`;

const AddItemButton = styled.Pressable`
  background-color: ${colors.iosBlue};
  border-radius: 10px;
  padding: 10px;
  min-width: 60%;
  align-items: center;
`;

const AddItemButtonInnerText = styled.Text`
  color: ${colors.white};
  font-size: 16px;
`;

const AddListItemModal = ({ setModalVisibility }) => {
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
  });
  const { accountStore } = useContext(MobxContext);

  const handleAddItemBtnPress = () => {
    if (newTodo.title === '') {
      Alert.alert(
        'Oops! Something went wrong',
        'It seems you forgot to enter a title. All TO-DOs should have one.',
        [{ text: 'OK', onPress: () => {} }]
      );
      return;
    }
    accountStore.userLoggedIn.addTodo({
      title: newTodo.title,
      description: newTodo.description,
      authorId: accountStore.userLoggedIn.id,
    });
    setModalVisibility(false);
  };
  return (
    <SafeAreaContent>
      <ModalCard>
        <ModalText>What else you need to do?</ModalText>
        <InputLabel>Title</InputLabel>
        <ModalInput
          onChangeText={(value) => setNewTodo({ ...newTodo, title: value })}
          placeholder="Type something i.e 'Go shopping'"
        />
        <InputLabel>Description</InputLabel>
        <ModalInput
          onChangeText={(value) =>
            setNewTodo({ ...newTodo, description: value })
          }
          placeholder="If needed, type here some notes about the task."
          multiline
          numberOfLines={3}
        />
        <Button title="Go back" onPress={() => setModalVisibility(false)} />
        <AddItemButton onPress={() => handleAddItemBtnPress()}>
          <AddItemButtonInnerText>Add task</AddItemButtonInnerText>
        </AddItemButton>
      </ModalCard>
    </SafeAreaContent>
  );
};

AddListItemModal.propTypes = {
  setModalVisibility: PropTypes.func.isRequired,
};

export default observer(AddListItemModal);
