import axios from 'axios';

export async function createTodo(someTitle, someDescription, someAuthorId) {
  const response = await axios.post('http://10.0.2.2:3000/todo', {
    title: someTitle,
    content: someDescription,
    authorId: someAuthorId,
  });
  console.log(response);
  if (response.status !== 200) {
    // devuelve 200 en vez de 201
    throw new Error('Server was unable to create the task');
  }
  return response.data;
}

export async function getTodos(accountId) {
  const response = await axios.get(`http://10.0.2.2:3000/todos/${accountId}`);
  if (response.status !== 200) {
    throw new Error(
      'Server was unable to fetch the tasks for the specified account'
    );
  }
  return response.data;
}

export async function deleteTodo(todoId) {
  const response = await axios.delete(`http://10.0.2.2:3000/todo/${todoId}`);
  if (response.status !== 200) {
    throw new Error('Server was unable to delete the specified task');
  }
}

export async function checkTodo(todo) {
  const response = await axios.put(`http://10.0.2.2:3000/todo/${todo.id}`, {
    checked: todo.isDone,
  });
  if (response.status !== 200) {
    throw new Error('Server was unable to update specified task');
  }
  return response.data;
}

export default { createTodo, getTodos, deleteTodo, checkTodo };
