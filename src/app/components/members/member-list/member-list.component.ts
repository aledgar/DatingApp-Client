import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {AlertifyService} from '../../../services/alertify.service';
import {ActivatedRoute} from '@angular/router';
import {Pagination} from '../../../models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[] = [];
  paginationInfo: Pagination;
  paramItemsPerPage: number;
  minAge = 18;
  maxAge = 99;
  gender = '';

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
        : this.paginationInfo.itemsPerPage, this.minAge, this.maxAge, this.gender)
      .subscribe(paginatedUsers => {
          console.log(paginatedUsers);
          this.users = paginatedUsers.result;
          this.paginationInfo = paginatedUsers.pagination;
        },
        error => this.alertify.error('Error getting the users, refresh the page.'));
  }

}
