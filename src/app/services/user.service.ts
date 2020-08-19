import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {environment} from '../../environments/environment';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     Authorization: 'Bearer ' + localStorage.getItem('token')
//   })
// };


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.url}/api/users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.url}/api/users/find/${id}`);
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(`${environment.url}/api/users/${id}`, user);
  }

  updateMainPhoto(idUser: number, idPhoto: number) {
    return this.http.put(`${environment.url}/api/users/${idUser}/photo/${idPhoto}`, {});
  }

  deletePhoto(idUser: number, idPhoto) {
    return this.http.delete(`${environment.url}/api/users/${idUser}/photo/${idPhoto}`);
  }
}
