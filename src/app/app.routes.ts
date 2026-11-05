import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login-component/login-component';
import { RegisterComponent } from './features/auth/components/register-component/register-component';
import { NotFoundComponent } from './features/pages/not-found-component/not-found-component';
import { CollectionDetailComponent } from './features/collections/collection-detail-component/collection-detail-component';

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "collection",
    children: [
      {
        path: "",
        component: CollectionDetailComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];
