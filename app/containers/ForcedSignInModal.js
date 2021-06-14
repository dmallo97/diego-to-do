/* eslint-disable react/require-default-props */
import React, { useContext } from 'react';

// import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import Emoji from 'react-native-emoji';
import styled from 'styled-components';

import { MobxContext } from '../models/Root';
import colors from '../styles/constants/Colors';

const ModalCard = styled.View`
  background-color: ${colors.white};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 35px;
`;

const SafeAreaContent = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

const ModalTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

const ModalText = styled.Text`
  font-size: 18px;
`;

const UserListRow = styled.Pressable`
  border-radius: 10px;
  padding: 35px;
  shadow-color: ${colors.black};
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

const UserListRowText = styled.Text`
  font-size: 20px;
`;

const SignUpButton = styled.Pressable`
  background-color: ${colors.iosBlue};
  border-radius: 10px;
  padding: 10px;
  min-width: 60%;
  align-items: center;
`;

const SignUpButtonInnerText = styled.Text`
  color: ${colors.white};
  font-size: 16px;
`;

const ForcedSignInModal = ({ navigation, setModalVisibility }) => {
  const { accountStore } = useContext(MobxContext);
  // const navigation = useNavigation();
  const handleSignIn = (account) => {
    accountStore.logIn(account);
    setModalVisibility(false);
  };
  const handleSignUpBtnPress = () => {
    navigation.navigate('Accounts', { screen: 'AddUserModal' });
    setModalVisibility(false);
  };
  return (
    <SafeAreaContent>
      <ModalCard>
        <ModalTitle>
          Hey there! <Emoji name="wave" />
        </ModalTitle>
        <ModalText>
          To continue, please select the desired account or sign up below.
        </ModalText>
        <FlatList
          data={accountStore.accounts}
          keyExtractor={(account) => account.id}
          renderItem={({ account }) => (
            <UserListRow onPress={() => handleSignIn(account)}>
              <UserListRowText>{account.name}</UserListRowText>
            </UserListRow>
          )}
        />
        <SignUpButton onPress={() => handleSignUpBtnPress()}>
          <SignUpButtonInnerText>
            I dont have an account, sign me up
          </SignUpButtonInnerText>
        </SignUpButton>
      </ModalCard>
    </SafeAreaContent>
  );
};

ForcedSignInModal.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
  setModalVisibility: PropTypes.func.isRequired,
};

export default observer(ForcedSignInModal);
