import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ManageCampaignComponent } from "./manage-campaign.component";

const routes: Routes = [
  { path: "", component: ManageCampaignComponent },
  {
    path: ":id",
    loadComponent: () =>
      import("./campaign-info/campaign-info.component").then(
        (e) => e.CampaignInfoComponent
      ),
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageCampaignRouting {}
