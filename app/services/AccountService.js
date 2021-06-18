/* eslint-disable no-console */
import axios from 'axios';
import { Platform } from 'react-native';

const url = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

export async function createAccount(someEmail) {
  let response;
  try {
    response = await axios.post(`http://${url}:3000/user`, {
      email: someEmail,
    });
  } catch (error) {
    console.log(error);
  }

  if (response.status !== 200) {
    // devuelve 200 en vez de 201
    throw new Error('Server was unable to create the account');
  }
  return response.data;
}

export async function getAccounts() {
  const response = await axios.get(`http://${url}:3000/users`);
  if (response.status !== 200) {
    throw new Error('Server was unable to fetch accounts');
  }
  return response.data;
}

export default { createAccount, getAccounts };
