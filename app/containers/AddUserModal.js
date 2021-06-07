import React, { useState, useCallback, useContext } from 'react';

import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { Text, KeyboardAvoidingView, Platform, Button } from 'react-native';
import styled from 'styled-components';

import { MobxContext } from '../models/Root';
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

const Input = styled.TextInput`
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
  const [newAccountFields, setNewAccountFields] = useState({
    name: '',
    email: '',
  });
  const { accountStore } = useContext(MobxContext);
  const handleAddUserBtnPress = useCallback(() => {
    const newAccount = accountStore.addAccount(newAccountFields);
    setNewAccountFields({
      name: '',
      email: '',
    });
    if (!accountStore.userLoggedIn) {
      accountStore.logIn(newAccount);
      navigation.navigate('Home');
    } else {
      navigation.goBack();
    }
  }, [newAccountFields]);

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FormCard>
          <Text style={{ fontSize: 24 }}>
            Who is going to manage this account?
          </Text>
          <Input
            onChangeText={(value) =>
              setNewAccountFields({ ...newAccountFields, name: value })
            }
            placeholder="John Doe"
            value={newAccountFields.name}
          />
          <Text style={{ fontSize: 24 }}>What is his/her email?</Text>
          <Input
            onChangeText={(value) =>
              setNewAccountFields({ ...newAccountFields, email: value })
            }
            placeholder="johndoe@example.com"
            value={newAccountFields.email}
          />
          <Button
            title="Go back"
            onPress={() =>
              navigation.navigate('Accounts', { screen: 'UsersList' })
            }
          />
          <AddUserButton onPress={() => handleAddUserBtnPress()}>
            <AddUserButtonInnerText>Add account</AddUserButtonInnerText>
          </AddUserButton>
        </FormCard>
      </KeyboardAvoidingView>
    </Container>
  );
};

AddUserModal.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};

export default observer(AddUserModal);
