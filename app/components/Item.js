import React from 'react';

import PropTypes from 'prop-types';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styled from 'styled-components';

import colors from '../styles/constants/Colors';

const Item = ({ description }) => (
  <Container>
    <BouncyCheckbox
      size={25}
      text={description}
      onPress={() => {}}
      fillColor={colors.iosBlue}
      unfillColor={colors.white}
      iconStyle={{ borderColor: colors.iosBlue }}
    />
  </Container>
);

Item.propTypes = {
  description: PropTypes.string.isRequired,
};

const Container = styled.View`
  display: flex;
  flex-direction: row;
  padding: 5px;
  height: 30px;
  justify-content: center;
`;

export default Item;
