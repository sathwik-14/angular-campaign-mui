import { Component, OnInit, ViewChild } from '@angular/core';
import { CampaignInterface } from '../types/campaign.interface';
import { SharedDataService } from '../../services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
})
export class CampaignComponent implements OnInit{
  dataSource = new MatTableDataSource<CampaignInterface>;

  constructor(private dataService: SharedDataService,) { }

  ngOnInit(){
    this.getCampaignData()
  }
  displayedColumns = ['id', 'name', 'status', 'ctr', 'start date']
  @ViewChild(MatSort) sort!: MatSort;


  getCampaignData(): void {
    this.dataService.getCampaigns().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
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
    this.getCampaignData()
  }

  onCampaignNameChange(newName: string) {
    this.newCampaignName = newName;
  }
}
