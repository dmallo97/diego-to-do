import { types, destroy, flow } from 'mobx-state-tree';

import { createAccount, getAccounts } from '../services/AccountService';
import {
  createTodo,
  getTodos,
  deleteTodo,
  checkTodo,
} from '../services/TodoService';

const normalizeModelList = (todosList) => {
  const normalizedList = [];
  todosList.forEach(function (todo) {
    normalizedList.push({
      id: todo.id,
      title: todo.title,
      description: todo.content,
      isDone: todo.checked,
    });
  });
  return normalizedList;
};

const TodoModel = types
  .model({
    id: types.identifier,
    title: types.string,
    description: types.maybe(types.string),
    isDone: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    changeTitle(newTitle) {
      self.title = newTitle;
    },
    changeDescription(newDescription) {
      self.description = newDescription;
    },
    markAsDone: flow(function* markAsDone() {
      try {
        yield checkTodo(self);
        self.isDone = !self.isDone;
      } catch (error) {
        console.log('Server couldnt check the task as done: ', error);
      }
    }),
  }))
  .named('TodoModel');

const AccountModel = types
  .model({
    id: types.identifier,
    email: types.string,
    todoList: types.optional(types.array(TodoModel), []),
  })
  .actions((self) => ({
    addTodo: flow(function* addTodo({ title, description, authorId }) {
      try {
        console.log('Inside addTodo action try block...');
        const newTodo = yield createTodo(title, description, authorId);
        console.log(
          'Returned todo: ',
          newTodo,
          'Trying to push into account...'
        );
        self.todoList.push({
          id: newTodo.id,
          title: newTodo.title,
          description: newTodo.content,
        });
        console.log('Todo pushed. Finishing action.');
      } catch (error) {
        console.log('Server couldnt create the task: ', error);
      }
    }),
    removeTodo: flow(function* removeTodo(todoItem) {
      try {
        yield deleteTodo(todoItem.id);
        destroy(todoItem);
      } catch (error) {
        console.log('Server couldnt delete the task: ', error);
      }
    }),
    fetchTodos: flow(function* fetchTodos() {
      try {
        console.log('Inside action fetchTodos try block...', 'Fetching todos');
        const responseDataObject = yield getTodos(self.id);
        console.log('Response from server: ', responseDataObject);
        self.todoList = normalizeModelList(responseDataObject.todos);
        console.log('Todos fetched, normalized and assigned to MST');
      } catch (error) {
        console.log('Server couldnt fetch accounts todos: ', error);
      }
    }),
  }))
  .named('AccountModel');

const AccountStore = types
  .model({
    accounts: types.optional(types.array(AccountModel), []),
    userLoggedIn: types.maybeNull(types.reference(AccountModel)),
  })
  .actions((self) => ({
    addAccount: flow(function* addAccount(email) {
      let newAccount;
      console.log('Trying to create account with email: ', email);
      try {
        console.log('Inside try');
        console.log(self.accounts);
        newAccount = yield createAccount(email);
        console.log('Account created: ', newAccount);
        self.accounts.push(newAccount);
        console.log('Account saved');
      } catch (error) {
        console.log('Server couldnt create the account: ', error);
      }
      return newAccount;
    }),
    fetchAccounts: flow(function* fetchAccounts() {
      try {
        console.log(
          'Inside fetchAccount action try block. Executing getAccounts service method'
        );
        const responseDataObject = yield getAccounts();
        console.log('Ready to assign fetched data...');
        self.accounts = responseDataObject.users;
        console.log(
          'After saving data into store. Exiting fetchAccounts method.'
        );
      } catch (error) {
        console.log('Server couldnt fetch accounts: ', error);
      }
    }),
    logIn: flow(function* logIn(account) {
      console.log('Trying to log in ', account);
      self.userLoggedIn = undefined;
      console.log('Currently logged in: ', self.userLoggedIn);
      self.userLoggedIn = account.id;
      console.log(
        'User was logged in: ',
        self.userLoggedIn,
        'Fetching accounts todos...'
      );
      yield self.userLoggedIn.fetchTodos();
      console.log('Finishing log in action');
    }),
    logOut() {
      self.userLoggedIn = undefined;
    },
  }))
  .named('Store');

export default AccountStore;
