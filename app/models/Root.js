import { createContext } from 'react';

import { types } from 'mobx-state-tree';

import AccountStore from './AccountStore';

export const RootStore = types.model({
  accountStore: types.optional(AccountStore, {}),
});

export const MobxContext = createContext();

export default { RootStore, MobxContext };
