import { Pipe, PipeTransform } from '@angular/core';

import { User } from 'src/app/user';

@Pipe({ name: 'filterByName' })
export class FilterByNamePipe implements PipeTransform {
  transform(users: User[], str: string): User[] {
    const trimStr = str.trim();
    if (trimStr.length > 0) {
      return users.filter(user => user.name.first.includes(trimStr) || user.name.last.includes(trimStr));
    }
    return users;
  }
}
