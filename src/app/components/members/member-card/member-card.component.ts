import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';
import {AlertifyService} from '../../../services/alertify.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() user: User;

  constructor(private userService: UserService, private alertify: AlertifyService) {
  }

  ngOnInit(): void {
  }

  addLike(recipentId: number): void {
    this.userService.giveLike(recipentId)
      .subscribe(next => {}, error => this.alertify.error(error));
  }
}
