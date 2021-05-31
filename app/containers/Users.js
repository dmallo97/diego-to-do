import React from 'react';

import PropTypes from 'prop-types';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import styled, { css } from 'styled-components';

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

const usersListSample = [
  { name: 'Pedro', selected: true },
  { name: 'Luana', selected: false },
  { name: 'Santiago', selected: false },
];

const Users = ({ navigation }) => {
  const handleUserPress = (userName) => userName;
  const handleAddUserBtnPress = () => {
    navigation.navigate('AddUserModal');
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ScreenDescription>
          ¡Hola {usersListSample[0].name}! Puedes elegir otro usuario si lo
          deseas.
        </ScreenDescription>
        <UserList
          data={usersListSample}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={handleUserPress(item.name)}>
              <UserListRow selected={item.selected}>
                <UserListRowText selected={item.selected}>
                  {item.name}
                </UserListRowText>
              </UserListRow>
            </TouchableOpacity>
          )}
        />
        <AddUserButton title="Add user" onPress={handleAddUserBtnPress} />
      </Container>
    </SafeAreaView>
  );
};

Users.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Users;
