import React, { useContext, useCallback } from 'react';

import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { TouchableOpacity, SafeAreaView, Text } from 'react-native';
import styled, { css } from 'styled-components';

import { MobxContext } from '../models/Root';
import colors from '../styles/constants/Colors';

const Container = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
`;

const AddUserButton = styled.Button`
  align-self: flex-end;
  color: ${colors.white};
  background-color: ${colors.iosBlue};
  justify-content: center;
`;

const ScreenDescription = styled.Text`
  margin: 20px;
  font-size: 20px;
`;

const UserList = styled.FlatList`
  padding: 50px;
`;

const UserListRow = styled.View`
  ${(props) =>
    props.selected &&
    css`
      background-color: grey;
    `}
  padding: 10px;
  border: 1px solid grey;
  border-radius: 3px;
  margin: 1px;
  display: flex;
  flex-direction: row;
`;

const UserListRowText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  ${(props) => {
    if (props.selected) {
      return `color: white`;
    }
    return `color: grey`;
  }}
`;

const Users = ({ navigation }) => {
  const { accountStore } = useContext(MobxContext);
  /* const handleUserPress = (account) => {
    console.log('Account pressed: ', account);
    console.log('User logged in: ', accountStore.userLoggedIn);
    if (!account) {
      return;
    }
    if (account.name === accountStore.userLoggedIn.name) {
      return; // deberia evaluarse id
    }
    accountStore.logOut();
    accountStore.logIn(account);
    navigation.navigate('Home');
  }; */
  const handleAddUserBtnPress = () => {
    navigation.navigate('AddUserModal');
  };

  const handleUserPress = useCallback((account) => {
    console.log('Account pressed: ', account);
    console.log('User logged in: ', accountStore.userLoggedIn);
    if (!account) {
      return;
    }
    if (account.name === accountStore.userLoggedIn.name) {
      return; // deberia evaluarse id
    }
    accountStore.logOut();
    accountStore.logIn(account);
    console.log(
      'Account logged in after executing function: ',
      accountStore.userLoggedIn
    );
    navigation.navigate('Home');
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ScreenDescription>
          ¡Hey {accountStore.userLoggedIn ? accountStore.userLoggedIn.name : ''}
          ! Not you? Choose another account to see others tasks
        </ScreenDescription>
        <UserList
          data={accountStore.accounts ? accountStore.accounts : []} // revisar
          keyExtractor={(item, index) => `${item} ${index}`}
          renderItem={({ item }) => {
            console.log('Account inside render item', item);
            console.log('Account store inside render item', accountStore);
            if (!item) {
              return <Text>Couldnt display account</Text>;
            }
            return (
              <TouchableOpacity onPress={() => handleUserPress(item)}>
                <UserListRow
                  selected={item.name === accountStore.userLoggedIn.name}
                >
                  <UserListRowText
                    selected={item.name === accountStore.userLoggedIn.name}
                  >
                    {item.name}
                  </UserListRowText>
                </UserListRow>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={() => (
            <Text>Oops! We couldnt find more accounts to choose from</Text>
          )}
        />
        <AddUserButton
          title="Add user"
          onPress={() => handleAddUserBtnPress()}
        />
      </Container>
    </SafeAreaView>
  );
};

Users.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default observer(Users);
