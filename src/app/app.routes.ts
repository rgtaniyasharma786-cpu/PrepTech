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

export const routes: Routes = [
    { path: '', redirectTo: '/student/home1', pathMatch: 'full' },
 

    { path: 'login', component: LoginComponent },

    {
        path: 'student', component: StudentLayoutComponent, children: [
            { path: 'home1', component: Home1Component },
            { path: 'register', component: RegisterComponent },
            { path: 'courses',  component: CoursesComponent },
            { path: 'data_structures', component: DataStructuresComponent },
            { path: 'cloud_computing', component: CloudComputingComponent },
            { path: 'computer_networks', component: ComputerNetworksComponent },
            { path: 'operating_system', component: OperatingSystemsComponent },
            { path: 'dbms', component: DbmsComponent },
            { path: 'data_science', component: DataScienceComponent },
            { path: 'software_engineering', component: SoftwareEngineeringComponent },
            { path: 'machine_learning', component: MachineLearningComponent },
            { path: 'python', component: PythonComponent },
            { path: 'c_language', component: CLanguageComponent },
            { path: 'c_plus_plus', component: CPlusPlusComponent },
            { path: 'sql', component: SqlComponent },
            { path: 'java', component: JavaComponent },
            { path: 'java_script', component: JavaScriptComponent },
            { path: 'react_js', component: ReactJsComponent },
            { path: 'angular', component: AngularComponent },
            { path: 'analytical_aptitude', component: AnalyticalAptitudeComponent },
            { path: 'numerical_aptitude', component: NumericalAptitudeComponent },
            { path: 'technical_aptitude', component: TechnicalAptitudeComponent },
            { path: 'verbal_ability', component: VerbalAbilityComponent },
            { path: 'subjects', component: SubjectsComponent },
            { path: 'languages', component: LanguagesComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'aptitude', component: AptituteComponent },
            { path: 'contact-us', component: ContactUsComponent },
            { path: 'job_role', component: JobRoleComponent }
        ]
    },



];
