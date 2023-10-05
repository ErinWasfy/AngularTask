import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ReportListComponent } from './report-list/report-list.component';

export const routes: Routes = [
{
  path: '',
  redirectTo: 'report',
  pathMatch: 'full'
},
{
    path: 'report',
    component: AppComponent
},
/*{
  path: '/reports/:reportId',
  component: ReportEditComponent
}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
