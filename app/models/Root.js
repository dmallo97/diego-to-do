import { createContext } from 'react';

import { types } from 'mobx-state-tree';

import AccountStore from './AccountModel';
import { TodoListStore } from './TodoModel';

const RootStore = types.model({
  todoListStore: TodoListStore,
  accountStore: AccountStore,
});

const MobxContext = createContext();

export default { RootStore, MobxContext };
