import { Routes } from '@angular/router';
import {loggedInGuard} from "../logged-in-guard";
import {LoginComponent} from "./login.component";
import {ItemListComponent} from "./item-list.component";
import {ItemDetailComponent} from "./item-detail.component";

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  }, {
    path: 'items',
    component: ItemListComponent,
    canActivate: [loggedInGuard]
  }, {
    path: 'createItem',
    component: ItemDetailComponent,
    canActivate: [loggedInGuard]
  },{
    path: 'itemDetail/:id',
    component: ItemDetailComponent,
    canActivate: [loggedInGuard]
  }
];
