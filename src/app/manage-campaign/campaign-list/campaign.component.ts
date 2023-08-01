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
data:any;
  constructor(private dataService: SharedDataService,) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => (this.campaignData = data));
    this.data = new MatTableDataSource(this.campaignData);
  }
  campaignData: CampaignInterface[] = [];
  displayedColumns = ['id', 'name', 'status', 'ctr', 'start date', 'Actions']
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.data.sort = this.sort;
  }
  newCampaignName: string  = 'New Campaign';
  showForm: boolean = false;
  ascOrder = true;

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onCampaignNameChange(newName: string) {
    this.newCampaignName = newName;
  }



  sortDate() {
    if (this.ascOrder) {
      this.campaignData = this.campaignData.sort(
        (a: CampaignInterface, b: CampaignInterface) => {
          const date1 = new Date(a['start date']).getTime();
          const date2 = new Date(b['start date']).getTime();
          return date2 - date1;
        }
      );
    } else {
      this.campaignData = this.campaignData.sort(
        (a: CampaignInterface, b: CampaignInterface) => {
          const date1 = new Date(a['start date']).getTime();
          const date2 = new Date(b['start date']).getTime();
          return date1 - date2;
        }
      );
    }
    this.ascOrder = !this.ascOrder;
  }
}
