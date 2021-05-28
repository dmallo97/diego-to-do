import React, { useState, useCallback } from 'react';

import PropTypes from 'prop-types';
import { Text, KeyboardAvoidingView, Platform, Button } from 'react-native';
import styled from 'styled-components';

import colors from '../styles/constants/Colors';

const Container = styled.SafeAreaView`
  background-color: rgba(0, 0, 0, 0.5);
  flex: 1;
  flex-direction: column;
`;

const FormCard = styled.View`
  background-color: ${colors.white};
  border-radius: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  margin-top: auto;
  padding: 20px;
`;

const EmailInput = styled.TextInput`
  border-color: grey;
  border-width: 1px;
  padding: 10px;
  border-radius: 5px;
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const AddUserButton = styled.Pressable`
  background-color: ${colors.iosBlue};
  padding: 15px;
  align-items: center;
  border-radius: 10px;
`;

const AddUserButtonInnerText = styled.Text`
  color: ${colors.white};
  font-size: 20px;
`;

const AddUserModal = ({ navigation }) => {
  const [newUserEmail, setUserEmail] = useState('');

  const handleAddUserBtnPress = useCallback(() => {
    navigation.goBack();
  }, [newUserEmail]);

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FormCard>
          <Text style={{ fontSize: 24 }}>Enter new account email</Text>
          <EmailInput
            onChangeText={(value) => setUserEmail(value)}
            placeholder="johndoe@example.com"
          />
          <Button title="Go back" onPress={() => navigation.goBack()} />
          <AddUserButton onPress={handleAddUserBtnPress}>
            <AddUserButtonInnerText>Add account</AddUserButtonInnerText>
          </AddUserButton>
        </FormCard>
      </KeyboardAvoidingView>
    </Container>
  );
};

AddUserModal.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default AddUserModal;
