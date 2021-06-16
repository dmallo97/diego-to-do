import axios from 'axios';

export async function createAccount(someEmail) {
  console.log(
    'Executing createAction method in AccountService with email: ',
    someEmail
  );
  let response;
  try {
    response = await axios.post('http://10.0.2.2:3000/user', {
      email: someEmail,
    });
    console.log('Server responded :', response);
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
  console.log('Inside getAccounts. Calling API...');
  const response = await axios.get('http://10.0.2.2:3000/users');
  if (response.status !== 200) {
    throw new Error('Server was unable to fetch accounts');
  }
  console.log('Returning...');
  return response.data;
}

export default { createAccount, getAccounts };
