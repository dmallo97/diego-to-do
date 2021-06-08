import React from 'react';

import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styled from 'styled-components';

import colors from '../styles/constants/Colors';

const Item = ({ task, account }) => {
  const handlePress = () => {
    console.log('Task pressed: ', task);
    task.markAsDone();
    console.log('Task status in MST: ', task.isDone);
    // account.removeTodo(task);
    console.log('Account after task removal: ', account);
  };
  return (
    <Container>
      <BouncyCheckbox
        size={35}
        text={task.title}
        isChecked={task.isDone}
        onPress={() => handlePress()}
        fillColor={colors.iosBlue}
        unfillColor={colors.white}
        textStyle={{ fontSize: 20 }}
        iconStyle={{ borderColor: colors.iosBlue }}
      />
      {!task.isDone && task.description !== '' ? (
        <TaskDescriptionContainer>
          <Description>{task.description}</Description>
        </TaskDescriptionContainer>
      ) : (
        <></>
      )}
    </Container>
  );
};

Item.propTypes = {
  account: PropTypes.shape({
    removeTodo: PropTypes.func.isRequired,
  }).isRequired,
  task: PropTypes.shape({
    isDone: PropTypes.bool.isRequired,
    markAsDone: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

const Container = styled.View`
  display: flex;
  flex-direction: column;
  padding: 5px;
  ${'' /* justify-content: center; */}
  background-color: ${colors.white};
`;

const TaskDescriptionContainer = styled.View`
  margin-top: 10px;
  background-color: ${colors.descriptionBackground};
  border-width: 1px;
  border-color: ${colors.descriptionDarkerGrey};
  border-radius: 5px;
  padding: 10px;
`;

const Description = styled.Text`
  color: ${colors.descriptionDarkerGrey};
  font-size: 16px;
`;

export default observer(Item);
