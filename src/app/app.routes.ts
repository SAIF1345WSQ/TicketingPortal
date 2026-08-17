import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { ChatBoxComponent } from './pages/chat-box/chat-box.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { SupportTeamComponent } from './pages/support-team/support-team.component';
import { AdminPannelComponent } from './pages/admin-pannel/admin-pannel.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TicketRaiseComponent } from './pages/ticket-raise/ticket-raise.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'index',
        component: IndexComponent
      },
      {
        path: 'chat-box',
        component: ChatBoxComponent
      },
      {
        path: 'user-registration',
        component: UserRegistrationComponent
      },
      {
        path: 'support-team',
        component: SupportTeamComponent
      },
      {
        path: 'ticket-raise',
        component: TicketRaiseComponent
      },
      {
        path: 'admin-pannel',
        component: AdminPannelComponent
      }
    ]
  },

  {
    path: '**',
    redirectTo: '/login'
  }
];