import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateAccountComponent } from './create-account/create-account.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'home-page', component: HomePageComponent},
    {path: 'create-account', component: CreateAccountComponent}
];
