import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NavComponent} from './components/nav/nav.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { MemberUpdateComponent } from './components/members/member-update/member-update.component';
import {MemberUpdateResolver} from './resolvers/mermber-update.resolver';
import { PhotoEditorComponent } from './components/members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {TimeagoModule} from 'ngx-timeago';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {ListResolver} from './resolvers/list.resolver';
import {MessagesResolver} from './resolvers/messages.resolver';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { MessagesThreadComponent } from './components/messages/messages-thread/messages-thread.component';

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
    MemberDetailComponent,
    MemberUpdateComponent,
    PhotoEditorComponent,
    MessagesThreadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    FileUploadModule,
    TimeagoModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    NgxGalleryModule,
    ButtonsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/auth']
      }
    }),
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    MemberDetailResolver,
    MembersResolver,
    MemberUpdateResolver,
    MessagesResolver,
    ListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
