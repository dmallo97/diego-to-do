/* eslint-disable no-console */
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
  todosList.forEach(function normalize(todo) {
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
        yield deleteTodo(todoItem.id);
        destroy(todoItem);
      } catch (error) {
        console.log('Server couldnt delete the task: ', error);
      }
    }),
    fetchTodos: flow(function* fetchTodos() {
      try {
        const responseDataObject = yield getTodos(self.id);
        self.todoList = normalizeModelList(responseDataObject.todos);
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
      try {
        newAccount = yield createAccount(email);
        self.accounts.push(newAccount);
      } catch (error) {
        console.log('Server couldnt create the account: ', error);
      }
      return newAccount;
    }),
    fetchAccounts: flow(function* fetchAccounts() {
      try {
        const responseDataObject = yield getAccounts();
        self.accounts = responseDataObject.users;
      } catch (error) {
        console.log('Server couldnt fetch accounts: ', error);
      }
    }),
    logIn: flow(function* logIn(account) {
      self.userLoggedIn = undefined;
      self.userLoggedIn = account.id;
      yield self.userLoggedIn.fetchTodos();
    }),
    logOut() {
      self.userLoggedIn = undefined;
    },
  }))
  .named('Store');

export default AccountStore;
