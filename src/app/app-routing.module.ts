import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { LoginComponent } from "./manage-auth/login/login.component";
import { RegistrationComponent } from "./manage-auth/registration/registration.component";
import { isLoggedGuard } from "./manage-auth/is-logged.guard";
import { AppNavComponent } from "./app-nav/app-nav.component";

const routes: Routes = [
  {
    path: "",
    component: AppNavComponent,
    children: [
      {
        path: "campaign",
        loadChildren: () =>
          import("./manage-campaign/manage-campaign.module").then(
            (e) => e.CampaignModule
          ),
      },
    ],
  },
  { path: "login", component: LoginComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
