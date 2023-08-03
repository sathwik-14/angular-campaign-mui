import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CampaignComponent } from "./campaign-list/campaign.component";
import { CampaignInfoComponent } from "./campaign-info/campaign-info.component";

const routes: Routes = [
  { path: "", component: CampaignComponent },
  { path: ":id", component: CampaignInfoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageCampaignRouting {}
