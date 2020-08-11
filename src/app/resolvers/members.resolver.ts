import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {AlertifyService} from '../services/alertify.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';


@Injectable()
export class MembersResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {
  }


  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUsers().pipe(
      catchError(error => {
        this.alertify.error('Problems retrieving the data');
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }

}
