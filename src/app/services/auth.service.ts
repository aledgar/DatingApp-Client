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

  changeMemberPhoto(photoUrl: string): void {
    this.photoUrl.next(photoUrl);
  }

  login(model: any): Observable<any> {
    return this.http.post(`${environment.url}/api/auth/login`, model)
      .pipe(
        map((response: any) => {

          if (response) {
            const {email, id, photoUrl} = response.user;
            console.log(email);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify({email, id, image: (photoUrl) ? photoUrl : '../../assets/user.png'}));
            this.currentUser =
              {
                email,
                id,
                image: (photoUrl) ? photoUrl : '../../assets/user.png'
              };

            this.changeMemberPhoto((photoUrl) ? photoUrl : '../../assets/user.png');
          }
        })
      );
  }

  signUp(model: any): Observable<any> {
    return this.http.post(`${environment.url}/api/auth/register`, model);
  }


  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
