import axios from 'axios';

export async function createAccount(someEmail) {
  console.log(
    'Executing createAction method in AccountService with email: ',
    someEmail
  );
  let response;
  try {
    response = await axios.post('http://localhost:3000/user', {
      email: someEmail,
    });
  } catch (error) {
    console.log(error);
  }

  console.log('Response from server', response);
  if (response.status !== 200) {
    // devuelve 200 en vez de 201
    throw new Error('Server was unable to create the account');
  }
  console.log('Returning data: ', response.data);
  return response.data;
}

export async function getAccounts() {
  const response = undefined;
  if (response.status !== 200) {
    throw new Error('Server was unable to fetch accounts');
  }
  return response.data;
}

export default { createAccount, getAccounts };
