import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /*   {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module'),
  }, */
  /*   {
    path: '',
    component: '',
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
