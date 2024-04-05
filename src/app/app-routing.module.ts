import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObUnknownRouteModule } from '@oblique/oblique';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'validator',
    pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'validator',
    loadChildren: () => import('./feature/validator/routes').then(m => m.routes)
  },
  // { path: '**', redirectTo: 'unknown-route' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true }), ObUnknownRouteModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
