import { Component, OnInit, ViewChild } from '@angular/core';
import { CampaignInterface } from './types/campaign.interface';
import { SharedDataService } from '../services/data.service';

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
  newCampaignName: string  = 'New Campaign';
  showForm: boolean = false;
  ascOrder = true;

  /**
   * get campaign data from data service and store it in campaigns variable
   */
  getCampaignData(): void {
    this.dataService.getCampaigns().subscribe((data) => {
     this.campaigns = data
    });
  }

  /**
   * add a new campaign and get the updated data from dataService
   * @param {CampaignInterface} newCampaign
   */
  addCampaign(newCampaign: CampaignInterface) {   
    this.dataService.addCampaign(newCampaign as CampaignInterface)
    .subscribe((campaign :any) => {
      this.getCampaignData()
    });
  }

  /**
   * toggle campaign-form component and related components
   */
  toggleForm() {
    this.showForm = !this.showForm;
    this.newCampaignName  = 'New Campaign';
    this.getCampaignData()
  }

  /**
   * updates campaign name based on campaign-name changes in child component
   * @param {any} newName:string
   * @returns {any}
   */
  onCampaignNameChange(newName: string) {
    this.newCampaignName = newName;
  }
}
