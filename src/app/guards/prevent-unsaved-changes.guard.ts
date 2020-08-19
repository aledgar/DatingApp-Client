import {Injectable} from '@angular/core';
import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {MemberUpdateComponent} from '../components/members/member-update/member-update.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberUpdateComponent> {
  canDeactivate(
    component: MemberUpdateComponent) {
    if (component.updateForm.dirty) {
      return confirm('Are you sure you want to continue?');
    }
    return true;
  }
}
