import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {MemberListComponent} from './components/members/member-list/member-list.component';
import {MessagesComponent} from './components/messages/messages.component';
import {ListsComponent} from './components/lists/lists.component';
import {AuthGuard} from './guards/auth.guard';
import {MemberDetailComponent} from './components/members/member-detail/member-detail.component';
import {MemberDetailResolver} from './resolvers/member-detail.resolver';
import {MembersResolver} from './resolvers/members.resolver';


export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent, resolve: {users: MembersResolver}},
      {path: 'members/detail/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
      {path: 'messages', component: MessagesComponent},
      {path: 'lists', component: ListsComponent}
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];