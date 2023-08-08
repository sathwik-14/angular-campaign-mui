import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'campaign'},
  {
    path: "campaign",
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
