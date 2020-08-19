import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../services/auth.service';
import {AlertifyService} from '../../../services/alertify.service';

@Component({
  selector: 'app-member-update',
  templateUrl: './member-update.component.html',
  styleUrls: ['./member-update.component.css']
})
export class MemberUpdateComponent implements OnInit {
  @ViewChild('updateForm', {static: true}) updateForm: NgForm;
  public user: User;
  public showUploader = false;
  public photoUrl = '';

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.updateForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private authService: AuthService,
              private alertify: AlertifyService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  update() {

    if (+this.authService.currentUser.id === +this.route.snapshot.params['id']) {
      this.userService.updateUser(+this.authService.currentUser.id, this.user)
        .subscribe(next => {
          this.alertify.success('The profile has been updated.');
          this.updateForm.reset(this.user);
        }, error => this.alertify.error(error));
    }else{
      this.router.navigate(['/members']);
    }
  }

}
