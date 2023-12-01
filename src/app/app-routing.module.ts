import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'holidays',
    loadChildren: () => import('./holidays/holidays.module').then( m => m.HolidaysModule ),
  },
  {
    path: '',
    redirectTo: 'holidays',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'holidays',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
