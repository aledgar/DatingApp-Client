import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();
  public currentUser: any;
  public photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  public currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) {
  }

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any): Observable<any> {
    return this.http.post(`${environment.url}/api/auth/login`, model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            const {email, id, image} = user;
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify({email, id, image: image.url}));
            this.currentUser =
              {
                email,
                id,
                image: image.url
              };

            this.changeMemberPhoto(image.url);
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
