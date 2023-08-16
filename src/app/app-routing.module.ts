import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { LoginComponent } from "./manage-auth/login/login/login.component";
import { RegistrationComponent } from "./manage-auth/registration/registration/registration.component";
import { isLoggedGuard } from "./manage-auth/is-logged.guard";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {
    path: "campaign",
    canMatch:[isLoggedGuard],
    loadChildren: () =>
      import("./manage-campaign/manage-campaign.module").then(
        (e) => e.CampaignModule
      ),
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
