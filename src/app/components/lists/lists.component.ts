import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {Pagination} from '../../models/pagination';
import {UserService} from '../../services/user.service';
import {AlertifyService} from '../../services/alertify.service';
import {ActivatedRoute} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  users: User[] = [];
  paginationInfo: Pagination;
  paramItemsPerPage: number;
  likees = true;
  likers = false;

  constructor(private userService: UserService, private alertify: AlertifyService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.data.subscribe(data => {
      this.users = data['users'].result;
      this.paginationInfo = data['users'].pagination;
      this.paramItemsPerPage = this.paginationInfo.itemsPerPage;
    });
    console.log(this.paginationInfo);
  }

  pageChanges($event): void {
    this.loadInfo($event.page);
  }

  loadInfo(page): void {

    this.userService.getUsers(page,
      (this.paginationInfo.itemsPerPage !== this.paramItemsPerPage) ? this.paramItemsPerPage
        : this.paginationInfo.itemsPerPage, null, null, null)
      .subscribe(paginatedUsers => {
          console.log(paginatedUsers);
          this.users = paginatedUsers.result;
          this.paginationInfo = paginatedUsers.pagination;
        },
        error => this.alertify.error('Error getting the users, refresh the page.'));
  }

  loadUsersInfo(likees): void {
    this.likees = (likees) ? likees : false;
    this.likers = (!likees) ? true : false;
    this.userService.getUsers(1, 8, 18, 99, null,
      this.likees, this.likers)
      .subscribe(
        response => {
          this.users = response.result;
          this.paginationInfo = response.pagination;
        },
        error => {
          this.alertify.error('Problems retrieving the data');
        });
  }

}
