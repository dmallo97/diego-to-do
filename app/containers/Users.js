import React from 'react';

import { TouchableOpacity, SafeAreaView } from 'react-native';
import styled from 'styled-components';

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
  color: grey;
`;

const usersListSample = ['Pedro', 'Luana', 'Santiago'];

const Users = () => {
  const handlePress = () => {};
  const handleAddUserBtnClick = () => {};
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ScreenDescription>
          ¡Hola {usersListSample[0]}! Puedes elegir otro usuario si lo deseas.
        </ScreenDescription>
        <UserList
          data={usersListSample}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={handlePress}>
              <UserListRow>
                <UserListRowText>{item}</UserListRowText>
              </UserListRow>
            </TouchableOpacity>
          )}
        />
        <AddUserButton
          title="Agregar un usuario"
          onPress={handleAddUserBtnClick}
        />
      </Container>
    </SafeAreaView>
  );
};

export default Users;
