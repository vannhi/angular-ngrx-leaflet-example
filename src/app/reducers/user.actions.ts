import { createAction, props } from '@ngrx/store';

import { User } from '../user';

export const selectUser = createAction('[Users Component] Select an user', props<User>());

export const loadUsers = createAction('[Users Component] Load users');

export const usersLoadedSuccess = createAction('[Users API] Users Loaded Success', (users: User[]) => ({
  payload: users,
}));

export const updateUser = createAction('[User Detail Component] Update', (user: User) => ({ payload: user }));

export const usersLoadedError = createAction('[Users API] Users Loaded Error');
