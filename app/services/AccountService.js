import axios from 'axios';

export async function createAccount({ someEmail }) {
  const response = await axios.post('http://localhost:3000/user', {
    email: someEmail,
  });
  if (response.status !== 201) {
    throw new Error('Server was unable to create the account');
  }
  return response.data;
}

export default { createAccount };
