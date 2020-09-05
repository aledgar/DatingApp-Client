import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {PaginatedResult} from '../models/pagination';
import {Message} from '../models/message';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  userId: number = this.authService.currentUser.id;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  getMessages(page?, itemsPerPage?, messageContainer?): Observable<PaginatedResult<Message[]>> {
    let params = new HttpParams();
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();
    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (messageContainer) {
      params = params.append('messageContainer', messageContainer);
    }

    return this.httpClient.get<Message[]>(`${environment.url}/api/users/${this.userId}/message`, {observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getMessageThread(recipientId: number): Observable<Message[]> {
    return this.httpClient.get<Message[]>(`${environment.url}/api/users/${this.userId}/message/thread/${recipientId}`);
  }

  sendMessage(message): Observable<Message> {
    return this.httpClient.post<Message>(`${environment.url}/api/users/${this.userId}/message`, message);
  }

  markAsRead(messageId: number) {
    this.httpClient.put(`${environment.url}/api/users/${this.userId}/message/read/${messageId}`, {})
      .subscribe();
  }
}
