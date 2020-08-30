import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {AlertifyService} from '../../services/alertify.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @Output() signUpCancel = new EventEmitter<boolean>();
  bsConfig: Partial<BsDatepickerConfig>;
  user: User;
  registerForm: FormGroup;

  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private fb: FormBuilder,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, {containerClass: 'theme-dark-blue'});
    this.createRegisterForm();
  }

  createRegisterForm(): void {
    this.registerForm = this.fb.group({
      gender: ['male'],
      email: ['', [Validators.email, Validators.required]],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10)
        ]
      ],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup): any {
    return g.get('password').value === g.get('confirmPassword').value ? null : {misMatch: true};
  }

  cancel(): void {
    this.signUpCancel.emit(false);
  }

  signUp(): void {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.signUp(this.user)
        .subscribe(() => {
            this.alertify.success('Welcome to the family');
          }, error => {
            console.log(error.message);
          },
          () => {
            this.authService.login(this.user).subscribe(() => {
                this.router.navigate(['/members']);
              },
              err => console.log(err)
            );
          });
    }
  }
}
