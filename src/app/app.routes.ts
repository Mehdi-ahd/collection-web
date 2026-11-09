import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login-component/login-component';
import { RegisterComponent } from './features/auth/components/register-component/register-component';
import { NotFoundComponent } from './features/pages/not-found-component/not-found-component';
import { CollectionDetailComponent } from './features/collections/collection-detail-component/collection-detail-component';
import { guestGuard } from './core/guards/guest-guard/guest-guard';
import { authGuard } from './core/guards/auth-guard/auth-guard';
import { MainLayoutComponent } from './layouts/main-layout-component/main-layout-component';
import { CollectionItemEditComponent } from './features/collections/collection-item-edit-component/collection-item-edit-component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "collection",
    pathMatch: 'full'
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: []
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: []
  },
  {
    path: "collection",
    canActivate: [],
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        component: CollectionDetailComponent
      },
      {
        path: ':id',
        component: CollectionItemEditComponent,
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];
