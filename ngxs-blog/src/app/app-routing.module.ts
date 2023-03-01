import { LoggedInGuard } from './core/guards/logged-in.guard';
import { LoginComponent } from './components/login/login/login.component';
import { PostComponent } from './components/post/post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './components/login/reset-password/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [LoggedInGuard],
    component: PostListComponent,
  },
  {
    path: 'edit/:id',
    canActivate: [LoggedInGuard],
    component: PostComponent,
  },
  {
    path: 'create',
    canActivate: [LoggedInGuard],
    component: PostComponent,
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
