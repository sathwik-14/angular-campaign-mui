// shared-data.service.ts
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { CampaignInterface } from '../manage-campaign/types/campaign.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  
  campaignData: CampaignInterface[] =[
    {
      "id": "P001",
      "name": "Summer Sale",
      "status": "Completed",
      "ctr": 3.2,
      "start date": "2023-03-01"
    },
    {
      "id": "P002",
      "name": "Back to School",
      "status": "Draft",
      "ctr": 2.8,
      "start date": "2023-04-15"
    },
    {
      "id": "P003",
      "name": "Holiday Specials",
      "status": "Completed",
      "ctr": 4.1,
      "start date": "2023-05-20"
    },
    {
      "id": "P004",
      "name": "New Year's Countdown",
      "status": "Scheduled",
      "ctr": 0,
      "start date": "2023-06-25"
    },
    {
      "id": "P005",
      "name": "Spring Promotion",
      "location": {
        'value' : [
          "sullia","puttur"
        ]
      },
      "status": "Scheduled",
      "ctr": 1.9,
      "start date": "2023-07-10"
    }
  ]
  // Add methods to access and modify the data as needed

  getData(): Observable<any> {
    return of(this.campaignData);
  }

  addData(newItem: any): void {
    length =this.campaignData.length+1
    let newid: String ='P'
    let idnum = length
    if (length < 10)
      newid +='00'+idnum
    else if (length>=10 && length <100)
      newid +='0'+idnum
    newItem.id = newid
    newItem.status = "Draft";
    newItem['start date'] = Date.now();
    newItem.ctr = 0;
    this.campaignData.push(newItem);
  }

  deleteData(id:any):void {
    let arrayItem = this.campaignData.findIndex(c => c.id === id)
    this.campaignData.splice(arrayItem,1)
  }
}
