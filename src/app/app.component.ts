import { Component, OnDestroy } from '@angular/core';
import { State } from './reducers';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnDestroy {
  private selectedUserSubscription: Subscription;
  selectedUser?: User;

  constructor(store: Store<State>) {
    this.selectedUserSubscription = this.selectedUserSubscription = store
      .pipe(select(state => state.selectedUser))
      .subscribe(user => (this.selectedUser = user));
  }
  ngOnDestroy(): void {
    this.selectedUserSubscription.unsubscribe();
  }
}
