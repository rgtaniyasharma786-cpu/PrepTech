import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentLayoutComponent } from './student/student-layout/student-layout.component';
import { Home1Component } from './student/home1/home1.component';
import { CoursesComponent } from './student/courses/courses.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DataStructuresComponent } from './student/courses/data-structures/data-structures.component';
import { CloudComputingComponent } from './student/courses/cloud-computing/cloud-computing.component';
import { ComputerNetworksComponent } from './student/courses/computer-networks/computer-networks.component';
import { OperatingSystemsComponent } from './student/courses/operating-systems/operating-systems.component';
import { DbmsComponent } from './student/courses/dbms/dbms.component';
import { DataScienceComponent } from './student/courses/data-science/data-science.component';
import { SoftwareEngineeringComponent } from './student/courses/software-engineering/software-engineering.component';
import { MachineLearningComponent } from './student/courses/machine-learning/machine-learning.component';
import { PythonComponent } from './student/courses/python/python.component';
import { CLanguageComponent } from './student/courses/c-language/c-language.component';
import { CPlusPlusComponent } from './student/courses/c-plus-plus/c-plus-plus.component';
import { SqlComponent } from './student/courses/sql/sql.component';
import { JavaComponent } from './student/courses/java/java.component';
import { JavaScriptComponent } from './student/courses/java-script/java-script.component';
import { ReactJsComponent } from './student/courses/react-js/react-js.component';
import { AngularComponent } from './student/courses/angular/angular.component';
import { AnalyticalAptitudeComponent } from './student/courses/analytical-aptitude/analytical-aptitude.component';
import { NumericalAptitudeComponent } from './student/courses/numerical-aptitude/numerical-aptitude.component';
import { TechnicalAptitudeComponent } from './student/courses/technical-aptitude/technical-aptitude.component';
import { VerbalAbilityComponent } from './student/courses/verbal-ability/verbal-ability.component';
import { RegisterComponent } from './student/register/register.component';
import { SubjectsComponent } from './student/subjects/subjects.component';
import { LanguagesComponent } from './student/languages/languages.component';
import { AptituteComponent } from './student/aptitute/aptitute.component';
import { ProfileComponent } from './student/profile/profile.component';
import { JobRoleComponent } from './student/job-role/job-role.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/student/home1', pathMatch: 'full' },
 

    { path: 'login', component: LoginComponent },

    {
        path: 'student', component: StudentLayoutComponent, children: [
            { path: 'home1', component: Home1Component },
            { path: 'register', component: RegisterComponent },
            { path: 'courses',  component: CoursesComponent },
            { path: 'data_structures', component: DataStructuresComponent,  canActivate: [authGuard] },
            { path: 'cloud_computing', component: CloudComputingComponent,  canActivate: [authGuard] },
            { path: 'computer_networks', component: ComputerNetworksComponent,  canActivate: [authGuard] },
            { path: 'operating_system', component: OperatingSystemsComponent,  canActivate: [authGuard] },
            { path: 'dbms', component: DbmsComponent,  canActivate: [authGuard] },
            { path: 'data_science', component: DataScienceComponent,  canActivate: [authGuard] },
            { path: 'software_engineering', component: SoftwareEngineeringComponent,  canActivate: [authGuard] },
            { path: 'machine_learning', component: MachineLearningComponent,  canActivate: [authGuard] },
            { path: 'python', component: PythonComponent,  canActivate: [authGuard] },
            { path: 'c_language', component: CLanguageComponent,  canActivate: [authGuard] },
            { path: 'c_plus_plus', component: CPlusPlusComponent,  canActivate: [authGuard] },
            { path: 'sql', component: SqlComponent,  canActivate: [authGuard] },
            { path: 'java', component: JavaComponent,  canActivate: [authGuard] },
            { path: 'java_script', component: JavaScriptComponent,  canActivate: [authGuard] },
            { path: 'react_js', component: ReactJsComponent,  canActivate: [authGuard] },
            { path: 'angular', component: AngularComponent,  canActivate: [authGuard] },
            { path: 'analytical_aptitude', component: AnalyticalAptitudeComponent,  canActivate: [authGuard] },
            { path: 'numerical_aptitude', component: NumericalAptitudeComponent,  canActivate: [authGuard] },
            { path: 'technical_aptitude', component: TechnicalAptitudeComponent,  canActivate: [authGuard] },
            { path: 'verbal_ability', component: VerbalAbilityComponent,  canActivate: [authGuard] },
            { path: 'subjects', component: SubjectsComponent},
            { path: 'languages', component: LanguagesComponent},
            { path: 'profile', component: ProfileComponent,  canActivate: [authGuard] },
            { path: 'aptitude', component: AptituteComponent },
            { path: 'contact-us', component: ContactUsComponent,  canActivate: [authGuard] },
            { path: 'job_role', component: JobRoleComponent }
        ]
    },



];
