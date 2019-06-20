import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UsersService } from './service/users.service';
import { EMPTY } from 'rxjs';
import { usersLoadedSuccess, loadUsers } from './reducers';

@Injectable()
export class AppEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.usersService.getAll().pipe(
          map(usersLoadedSuccess),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private usersService: UsersService) {}
}
