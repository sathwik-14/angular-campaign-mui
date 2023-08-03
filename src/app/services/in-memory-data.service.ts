import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";
import { CampaignInterface } from "../manage-campaign/types/campaign.interface";

@Injectable({
  providedIn: "root",
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const campaigns:CampaignInterface[] = [
      {
        id: "P001",
        name: "Summer Sale",
        status: "Completed",
        ctr: 3.2,
        "start date": "2023-03-01",
      },
      {
        id: "P002",
        name: "Back to School",
        status: "Draft",
        ctr: 2.8,
        "start date": "2023-04-15",
      },
      {
        id: "P003",
        name: "Holiday Specials",
        status: "Completed",
        ctr: 4.1,
        "start date": "2023-05-20",
      },
      {
        id: "P004",
        name: "New Year's Countdown",
        status: "Scheduled",
        ctr: 0,
        "start date": "2023-06-25",
      },
      {
        id: "P005",
        name: "Spring Promotion",
        location: ["sullia", "puttur"],
        status: "Scheduled",
        ctr: 1.9,
        "start date": "2023-07-10",
      },
    ];
    return { campaigns };
  }

  genId(campaigns:CampaignInterface[]):string {
    let newId = ''
      let len = campaigns.length;
      if (len <10)
      newId = 'P00'+(len+1);
      else if (len <100)
      newId = 'P0'+(len+1)
      else
      newId = 'p'+(len+1)
    return newId
  }

  

  // genId(heroes: Hero[]): number {
  //   return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  // }
}
