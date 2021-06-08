import axios from 'axios';

export async function createTodo({ someTitle, someDescription, someAuthorId }) {
  const response = await axios.post('http://localhost:3000/todo', {
    title: someTitle,
    content: someDescription,
    authorId: someAuthorId,
  });
  if (response.status !== 201) {
    throw new Error('Server was unable to create the task');
  }
  return response.data;
}

export async function getTodos(accountId) {
  const response = await axios.get(`http://localhost:3000/todos/${accountId}`);
  if (response.status !== 200) {
    throw new Error(
      'Server was unable to fetch the tasks for the specified account'
    );
  }
  return response.data;
}

export default { createTodo, getTodos };
