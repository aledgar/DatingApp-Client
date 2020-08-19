import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
//import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      this.authService.currentUser = {
        id: user.id,
        email: user.email,
        image: user.image
      };

      this.authService.changeMemberPhoto(user.image);
    }
  }
}
