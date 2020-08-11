import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();
  public currentUser: any;

  constructor(private http: HttpClient) {
  }


  login(model: any): Observable<any> {
    return this.http.post(`${environment.url}/api/auth/login`, model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            const email = user.email;
            const id = user.id;
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify({email, id}));
            this.currentUser =
              {
                email,
                id
              };
          }
        })
      );
  }

  signUp(model: any): Observable<any> {
    return this.http.post(`${environment.url}/api/auth/register`, model);
  }


  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
