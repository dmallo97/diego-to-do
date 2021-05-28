import React from 'react';

import PropTypes from 'prop-types';
import { Button } from 'react-native';
import styled from 'styled-components';

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

const AddListItemModal = ({ setModalVisibility }) => (
  <SafeAreaContent>
    <ModalCard>
      <ModalText>What else you need to do?</ModalText>
      <ModalInput
        onChangeText={() => {}}
        placeholder="Type something like go shopping"
      />
      <Button title="Go back" onPress={() => setModalVisibility(false)} />
      <AddItemButton onPress={() => setModalVisibility(false)}>
        <AddItemButtonInnerText>Add task</AddItemButtonInnerText>
      </AddItemButton>
    </ModalCard>
  </SafeAreaContent>
);

AddListItemModal.propTypes = {
  setModalVisibility: PropTypes.func.isRequired,
};

export default AddListItemModal;
