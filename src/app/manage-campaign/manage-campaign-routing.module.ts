import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CampaignInfoComponent } from "./campaign-info/campaign-info.component";
import { ManageCampaignComponent } from "./manage-campaign.component";

const routes: Routes = [
  { path: "", component: ManageCampaignComponent },
  { path: ":id", component: CampaignInfoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageCampaignRouting {}
