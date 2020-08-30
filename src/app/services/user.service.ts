import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {environment} from '../../environments/environment';
import {PaginatedResult} from '../models/pagination';
import {map} from 'rxjs/operators';
import {AuthService} from './auth.service';

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

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getUsers(page?, itemsPerPage?, minAge = 18, maxAge = 99, gender?, likees?, likers?): Observable<PaginatedResult<User[]>> {

    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    params = params.append('minAge', minAge.toString());
    params = params.append('maxAge', maxAge.toString());
    params = params.append('userId', this.authService.currentUser.id);

    if (likees != null) {
      params = params.append('likees', likees);
    }


    if (likers != null) {
      params = params.append('likers', likers);
    }

    if (gender !== null) {
      params = params.append('gender', gender);
    }

    return this.http.get<User[]>(`${environment.url}/api/users`, {observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }));
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.url}/api/users/find/${id}`);
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(`${environment.url}/api/users/${id}`, user);
  }

  updateMainPhoto(idUser: number, idPhoto: number): Observable<any> {
    return this.http.put(`${environment.url}/api/users/${idUser}/photo/${idPhoto}`, {});
  }

  deletePhoto(idUser: number, idPhoto): Observable<any> {
    return this.http.delete(`${environment.url}/api/users/${idUser}/photo/${idPhoto}`);
  }

  giveLike(likeeId: number): Observable<any> {
    const likerId = this.authService.currentUser.id;
    return this.http.post(`${environment.url}/api/users/add-like`, {likeeId, likerId});
  }
}
