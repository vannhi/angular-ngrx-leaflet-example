import {
  Action,
  ActionReducerMap,
  createReducer,
  MetaReducer,
  on,
} from '@ngrx/store';
import { InjectionToken } from '@angular/core';

import { environment } from '../../environments/environment';
import { selectUser, usersLoadedSuccess, updateUser } from './user.actions';
import { User } from '../user';

export interface State {
  users?: User[];
  selectedUser?: User;
}

export const userReducer = createReducer<User | undefined>(
  undefined,
  on(selectUser, (_, action) => action),
);

export const loadUsersReducer = createReducer<User[] | undefined>(
  undefined,
  on(usersLoadedSuccess, (_, { payload }) => payload),
  on(updateUser, (state, { payload: newItem }) => {
    return (
      state &&
      state.map(item => {
        return item.id.name === newItem.id.name &&
          item.id.value === newItem.id.value
          ? newItem
          : item;
      })
    );
  }),
);

const rootReducers: ActionReducerMap<State, Action> = {
  users: loadUsersReducer,
  selectedUser: userReducer,
};

export const reducers = new InjectionToken<ActionReducerMap<State, Action>>(
  'Root reducers token',
  {
    factory: () => rootReducers,
  },
);

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export * from './user.actions';
