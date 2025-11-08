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
import { AdminDashboardComponent } from '../pages/admin-dashboard/admin-dashboard/admin-dashboard.component';
import { AdminManageJobsComponent } from '../pages/admin-manage-jobs/admin-manage-jobs/admin-manage-jobs.component';
import { JobDetailsComponent } from '../pages/job-details/job-details/job-details.component';
import { EmployersComponent } from '../pages/employers/employers/employers.component';
import { EmployerDetailsComponent } from '../pages/employer-details/employer-details/employer-details.component';
import { CandidateManagementComponent } from '../pages/candidate-management/candidate-management/candidate-management.component';
import { CandidateDetailsComponent } from '../pages/candidate-details/candidate-details/candidate-details.component';
import { ApplicationsComponent } from '../pages/applications/applications/applications.component';
import { PendingApprovalsComponent } from '../pages/pending-approvals/pending-approvals/pending-approvals.component';
import { EmployerAnalyticsComponent } from '../pages/employer-analytics/employer-analytics/employer-analytics.component';
import { ChatComponent } from '../pages/chat/chat/chat.component';
import { EmployerProfileComponent } from '../pages/employer-profile/employer-profile/employer-profile.component';
import { EmployerReportComponent } from '../pages/employer-report/employer-report/employer-report.component';
import { AdminAnalyticsComponent } from '../pages/admin-analytics/admin-analytics/admin-analytics.component';
import { ForgotPasswordComponent } from '../pages/authentification/forgot-password/forgot-password/forgot-password.component';
import { OtpComponent } from '../pages/authentification/otp/otp/otp.component';
import { ResetPasswordComponent } from '../pages/authentification/reset-password/reset-password/reset-password.component';
import { MyInvitesComponent } from '../pages/my-invites/my-invites/my-invites.component';

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
    {path: 'admin-dashboard', component: AdminDashboardComponent},
    {path: 'admin-manage-jobs', component: AdminManageJobsComponent},
    {path: 'job-details/:id', component: JobDetailsComponent},
    {path: 'employers',component: EmployersComponent},
    {path: 'employer-details', component: EmployerDetailsComponent},
    {path: 'candidates-management', component: CandidateManagementComponent},
    {path: 'candidate-details', component: CandidateDetailsComponent},
    {path: 'applications', component: ApplicationsComponent},
    {path: 'pending-approvals', component: PendingApprovalsComponent},
    {path: 'employer-analytics', component: EmployerAnalyticsComponent},
    {path: 'chat/:id', component: ChatComponent},
    {path: 'employer-profile', component:EmployerProfileComponent},
    {path: 'employer-report', component: EmployerReportComponent},
    {path: 'admin-analytics', component:AdminAnalyticsComponent},
    {path: 'forgot-password', component:ForgotPasswordComponent},
    {path: 'otp', component:OtpComponent},
    {path: 'reset-password', component: ResetPasswordComponent},
    {path: 'candidate-invites', component: MyInvitesComponent},
    {path: '**', redirectTo: '' },
];
