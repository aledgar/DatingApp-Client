import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavComponent} from './components/nav/nav.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {HomeComponent} from './components/home/home.component';
import {SignupComponent} from './components/signup/signup.component';
import {ErrorInterceptorProvider} from './services/error.interceptor';
import {AlertifyService} from './services/alertify.service';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MemberListComponent} from './components/members/member-list/member-list.component';
import {MessagesComponent} from './components/messages/messages.component';
import {ListsComponent} from './components/lists/lists.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes';
import {MemberCardComponent} from './components/members/member-card/member-card.component';
import {JwtModule} from '@auth0/angular-jwt';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import {MemberDetailResolver} from './resolvers/member-detail.resolver';
import {MembersResolver} from './resolvers/members.resolver';

// tslint:disable-next-line:typedef
export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    SignupComponent,
    MemberListComponent,
    MessagesComponent,
    ListsComponent,
    MemberCardComponent,
    MemberDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/auth']
      }
    })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    MemberDetailResolver,
    MembersResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
