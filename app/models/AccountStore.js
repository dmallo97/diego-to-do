import { types, destroy, flow } from 'mobx-state-tree';

import { createAccount } from '../services/AccountService';
import {
  createTodo,
  getTodos,
  deleteTodo,
  checkTodo,
} from '../services/TodoService';

const TodoModel = types
  .model({
    id: types.optional(types.string, ''),
    title: types.string,
    description: types.string,
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
        self.isDone = !self.isDone;
        yield checkTodo(self);
      } catch (error) {
        console.log(
          'Reverting modifications. Server couldnt check the task as done: ',
          error
        );
        self.isDone = !self.isDone;
      }
    }),
  }));

const AccountModel = types
  .model({
    id: types.optional(types.string, ''),
    email: types.string,
    todoList: types.optional(types.array(TodoModel), []),
  })
  .actions((self) => ({
    addTodo: flow(function* addTodo({ title, description, authorId }) {
      try {
        const newTodo = yield createTodo(title, description, authorId);
        self.todoList.push({
          id: newTodo.id,
          title: newTodo.title,
          description: newTodo.content,
        });
      } catch (error) {
        console.log('Server couldnt create the task: ', error);
      }
    }),
    removeTodo: flow(function* removeTodo(todoItem) {
      try {
        yield deleteTodo(todoItem);
        destroy(todoItem);
      } catch (error) {
        console.log('Server couldnt delete the task: ', error);
      }
    }),
    fetchTodos: flow(function* fetchTodos() {
      try {
        const todos = yield getTodos(self.id);
        self.todoList = todos;
      } catch (error) {
        console.log('Server couldnt fetch accounts todos: ', error);
      }
    }),
  }));

const AccountStore = types
  .model({
    accounts: types.optional(types.array(AccountModel), []),
    userLoggedIn: types.maybeNull(AccountModel),
  })
  .actions((self) => ({
    addAccount: flow(function* addAccount(email) {
      let newAccount;
      console.log('Trying to create account with email: ', email);
      try {
        console.log('Inside try');
        newAccount = yield createAccount(email);
        console.log('Account created: ', newAccount);
        self.accounts.push(newAccount);
        console.log('Account saved');
      } catch (error) {
        console.log('Server couldnt create the account: ', error);
      }
      return newAccount;
    }),
    /* fetchAccounts: flow(function* fetchAccounts() {
      try {
        const accounts = yield getAccounts();
        self.accounts = accounts;
      } catch (error) {
        console.log('Server couldnt fetch accounts: ', error);
      }
    }), */
    logIn(account) {
      self.userLoggedIn = account;
    },
    logOut() {
      self.userLoggedIn = undefined;
    },
  }));

export default AccountStore;
