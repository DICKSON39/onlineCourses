import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; // 👈 import your AuthGuard

// Components...
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { TeachersDashboardComponent } from './pages/teachers-dashboard/teachers-dashboard.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { UserComponent } from './pages/user/user.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { CourseFormComponent } from './pages/course-form/course-form.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseInfoComponent } from './pages/course-info/course-info.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { TeacherCourseComponent } from './pages/teacher-course/teacher-course.component';
import { MyClassesComponent } from './pages/my-classes/my-classes.component';
import { AdminCoursesComponent } from './pages/admin-courses/admin-courses.component';
import { EditCourseComponent } from './pages/edit-course/edit-course.component';
import { ShowPaymentsComponent } from './pages/show-payments/show-payments.component';
import { MyPaymentsComponent } from './pages/my-payments/my-payments.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { PaymentCancelComponent } from './pages/payment-cancel/payment-cancel.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditAdminComponent } from './pages/edit-admin/edit-admin.component';
import { TeachersOnlyComponent } from './pages/teachers-only/teachers-only.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'courses/login', component: LoginComponent },
  { path: 'courses/register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'payment-cancel', component: PaymentCancelComponent },

  {
    path: 'courses/admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [1] },
  },
  {
    path: 'courses/teacher',
    component: TeachersDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [2] },
  },

  {
    path: 'courses/student',
    component: StudentDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [3] },
  },
  {
    path: 'admin/users',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { roles: [1] },
  },
  {
    path: 'admin/user/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: [1] },
  },
  {
    path: 'users/update/:id',
    component: UpdateUserComponent,
    canActivate: [AuthGuard],
    data: { roles: [1, 2] }, // example: both roles allowed
  },
  {
    path: 'admin/courses',
    component: CourseFormComponent,
    canActivate: [AuthGuard],
    data: { roles: [1] },
  },
  {
    path: 'courses',
    component: CourseListComponent,
  },
  {
    path: 'my-classes',
    component: MyClassesComponent,
    canActivate: [AuthGuard],
    data: { roles: [2] },
  }, // Teacher's classes
  {
    path: 'courses/:id',
    component: CourseInfoComponent,
    canActivate: [AuthGuard],
    data: { roles: [1, 2, 3] },
  },
  {
    path: 'teacher/courses',
    component: TeacherCourseComponent,
    canActivate: [AuthGuard],
    data: { roles: [2] },
  }, // Teacher's cours
  {
    path: 'my-courses',
    component: AdminCoursesComponent,
    canActivate: [AuthGuard],
    data: { roles: [1] },
  },
  {
    path: 'admin/edit-course/:id',
    component: EditCourseComponent,
    canActivate: [AuthGuard],
    data: { roles: [1] },
  },

  {
    path: 'admin/payments',
    component: ShowPaymentsComponent,
    canActivate: [AuthGuard],
    data: { roles: [1] },
  }, // Admin payments
  {
    path: 'payments',
    component: MyPaymentsComponent,
    canActivate: [AuthGuard],
    data: { roles: [3] },
  },

  {
    path: 'admin/dashboard-stats',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [1] },
  },

  {
    path: 'editProfile/:id',
    component: EditAdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [1, 2, 3] },
  },

  {
    path: 'admin/teachers',
    component: TeachersOnlyComponent,
    canActivate: [AuthGuard],
    data: { roles: [1] },
  },
];
