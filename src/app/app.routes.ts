import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home/home.component';
import { ViewJobsComponent } from '../pages/view-jobs/view-jobs/view-jobs.component';
import { MyApplicationsComponent } from '../pages/my-applications/my-applications/my-applications.component';
import { MessagesComponent } from '../pages/messages/messages/messages.component';
import { ViewJobComponent } from '../pages/view-job/view-job/view-job.component';
import { LoginComponent } from '../pages/authentification/login/login/login.component';
import { CreateProfileComponent } from '../pages/authentification/create-profile/create-profile/create-profile.component';
import { IndustrySelectionComponent } from '../pages/authentification/industry-selection/industry-selection/industry-selection.component';
import { EmployerDashboardComponent } from '../pages/employer-dashboard/employer-dashboard/employer-dashboard.component';
import { PostJobComponent } from '../pages/post-job/post-job/post-job.component';
import { ManageJobsComponent } from '../pages/manage-jobs/manage-jobs/manage-jobs.component';
import { ApplicantsComponent } from '../pages/applicants/applicants/applicants.component';
import { StagesComponent } from '../pages/stages/stages/stages.component';
import { ViewProfileComponent } from '../pages/view-profile/view-profile/view-profile.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'view-jobs', component: ViewJobsComponent},
    {path: 'my-applications', component: MyApplicationsComponent},
    {path: 'massages', component: MessagesComponent},
    {path: 'view-job/:id', component: ViewJobComponent},
    {path: 'login', component: LoginComponent},
    {path: 'create-profile',component: CreateProfileComponent},
    {path: 'industry-selection', component: IndustrySelectionComponent},
    {path: 'employer-dashboard', component: EmployerDashboardComponent},
    {path: 'post-job', component: PostJobComponent},
    {path: 'manage-jobs', component: ManageJobsComponent},
    {path: 'applicants', component: ApplicantsComponent},
    {path: 'stages', component: StagesComponent},
    {path: 'view-profile/:id', component: ViewProfileComponent},
    {path: '**', redirectTo: '' },
];
