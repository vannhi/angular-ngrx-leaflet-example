import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { loadUsers, selectUser, State } from '../reducers';
import { User } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
})
export class UsersComponent implements OnInit {
  users$: Observable<User[] | undefined> = this.store.pipe(select(state => state.users));
  search = '';

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(loadUsers());
  }

  onSelect(user: User): void {
    this.store.dispatch(selectUser(user));
  }
}
