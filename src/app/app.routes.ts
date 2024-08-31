import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { CreateAccountComponent } from './create-account/create-account.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardsComponent},
    {path: 'create-account', component: CreateAccountComponent}
];
