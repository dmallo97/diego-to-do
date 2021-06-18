/* eslint-disable react/require-default-props */
import React, { useContext, useEffect, useState } from 'react';

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
  border-width: 1px;
  margin: 5px;
  padding: 10px;
`;

const UserListRowText = styled.Text`
  font-size: 16px;
  color: black;
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
  const [listRefreshing, setListRefreshing] = useState(false);
  const [accountListData, setAccountListData] = useState([]);

  const getAccounts = async () => {
    await accountStore.fetchAccounts();
  };

  useEffect(() => {
    setListRefreshing(true);
    getAccounts();
    setAccountListData(accountStore.accounts);
    setListRefreshing(false);
  }, []);

  const handleSignIn = async (account) => {
    await accountStore.logIn(account);
    setModalVisibility(false);
  };

  const handleSignUpBtnPress = () => {
    navigation.navigate('Accounts', { screen: 'AddUserModal' });
    setModalVisibility(false);
  };

  const renderAccount = (item) => (
    <UserListRow onPress={() => handleSignIn(item)}>
      <UserListRowText>{item?.email}</UserListRowText>
    </UserListRow>
  );

  // eslint-disable-next-line no-console
  console.log(accountStore.accounts);
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
          data={accountListData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderAccount(item)}
          refreshing={listRefreshing}
          style={{ margin: 10 }}
          extraData={accountStore.accounts}
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
