import { Component, OnInit, ViewChild } from '@angular/core';
import { CampaignInterface } from './types/campaign.interface';
import { SharedDataService } from '../services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-campaign',
  templateUrl: './manage-campaign.component.html',
  styleUrls: ['./manage-campaign.component.scss'],
})
export class ManageCampaignComponent implements OnInit{

  constructor(private dataService: SharedDataService,) { }

  ngOnInit(){
    this.getCampaignData()
  }

  campaigns: CampaignInterface[] = []


  getCampaignData(): void {
    this.dataService.getCampaigns().subscribe((data) => {
     this.campaigns = data
    });
  }

  addCampaign(newCampaign: CampaignInterface) {   
    newCampaign.status = "Draft"
    newCampaign.ctr = 0
    newCampaign['start date'] = Date.now().toString(); 
    this.dataService.addCampaign(newCampaign as CampaignInterface)
    .subscribe((campaign :any) => {
      this.getCampaignData()
    });
  }

  newCampaignName: string  = 'New Campaign';
  showForm: boolean = false;
  ascOrder = true;

  toggleForm() {
    this.showForm = !this.showForm;
    this.newCampaignName  = 'New Campaign';

    this.getCampaignData()
  }

  onCampaignNameChange(newName: string) {
    this.newCampaignName = newName;
  }
}
