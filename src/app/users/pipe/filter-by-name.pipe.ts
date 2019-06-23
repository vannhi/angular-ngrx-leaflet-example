import { Pipe, PipeTransform } from '@angular/core';

import { User } from 'src/app/user';

@Pipe({ name: 'filterByName' })
export class FilterByNamePipe implements PipeTransform {
  transform(users: User[], str: string): User[] {
    const lowerCaseStr = str.trim().toLocaleLowerCase();
    if (lowerCaseStr.length > 0) {
      return users.filter(
        user =>
          user.name.first.toLowerCase().includes(lowerCaseStr) || user.name.last.toLowerCase().includes(lowerCaseStr),
      );
    }
    return users;
  }
}
