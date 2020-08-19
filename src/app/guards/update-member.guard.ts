import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateMemberGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot): boolean {

    if (parseInt(next.params.id) === parseInt(this.authService.currentUser.id)) {
      return true;
    }

    this.router.navigate(['/']);

    return false;

  }

}
