import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignComponent } from './manage-campaign/campaign-list/campaign.component';
import { CampaignInfoComponent } from './manage-campaign/campaign-info/campaign-info.component';

const routes: Routes = [
  { path: 'campaign', component: CampaignComponent },
  { path: 'campaign/:id', component : CampaignInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
