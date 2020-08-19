import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AlertifyService} from '../../services/alertify.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {
    email: '',
    password: ''
  };

  photoUrl = '';

  constructor(public authService: AuthService,
              private alertifyService: AlertifyService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login(): void {
    this.authService.login(this.model)
      .subscribe(next => {
        this.model.email = '';
        this.model.password = '';
        this.alertifyService.success('Welcome 😙');
        this.router.navigate(['/members']);
      }, error => {
        this.alertifyService.error(error);
      }, () => {
        this.router.navigate(['/members']);
      });
  }

  isAuthenticated(): boolean {
    return this.authService.loggedIn();
  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
