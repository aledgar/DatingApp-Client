import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  public user: User;

  constructor(private userService: UserService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.data.subscribe(data => {
      this.user = data['user'];
      console.log(this.user);
    });
  }

}
