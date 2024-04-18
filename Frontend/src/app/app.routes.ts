import { Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MemberDetailsComponent } from './member-details/member-details.component';

export const routes: Routes = [
    {path:"members" , component:MemberComponent},
    {path:"dashboard" , component:DashboardComponent},
    {path:"",redirectTo:"/dashboard" ,pathMatch:'full'},
    {path:"detail/:id" , component:MemberDetailsComponent}
];
