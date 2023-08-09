import { Component, OnInit, ViewChild } from "@angular/core";
import { CampaignInterface } from "./types/campaign.interface";
import { SharedDataService } from "../services/data.service";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "app-campaign",
  templateUrl: "./manage-campaign.component.html",
  styleUrls: ["./manage-campaign.component.scss"],
})
export class ManageCampaignComponent implements OnInit {
  constructor(
    private dataService: SharedDataService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getCampaignData();
  }

  campaigns: CampaignInterface[] = [];
  newCampaignName: string = "New Campaign";
  showForm: boolean = false;
  ascOrder = true;

  /**
   * get campaign data from data service and store it in campaigns variable
   */
  getCampaignData(): void {
    this.dataService.getCampaigns().subscribe((data) => {
      this.campaigns = data;
    });
  }

  /**
   * add a new campaign and get the updated data from dataService
   * @param {CampaignInterface} newCampaign
   */
  addCampaign(newCampaign: CampaignInterface) {
    newCampaign.status = "Draft";
    newCampaign.ctr = 0;
    newCampaign["start date"] = new Date().toISOString();
    this.dataService
      .addCampaign(newCampaign as CampaignInterface)
      .subscribe((campaign: any) => {
        this.getCampaignData();
        this.openAddSnackBar();
      });
      this.toggleForm()
  }

  /**
   * toggle campaign-form component and related components
   */
  toggleForm() {
    this.showForm = !this.showForm;
    this.newCampaignName = "New Campaign";
    this.getCampaignData();
  }

  /**
   * updates campaign name based on campaign-name changes in child component
   * @param {any} newName:string
   * @returns {any}
   */
  onCampaignNameChange(newName: string) {
    this.newCampaignName = newName;
  }

  /**
   * Opens the snackbar component on adding a new campaign
   */
  openAddSnackBar() {
    this._snackBar.openFromComponent(AddCampaignComponent, {
      duration: 5 * 1000,
    });
  }
}

@Component({
  selector: "snack-bar-component-example-snack",
  template: `
    <span class="example-pizza-party"> Campaign added successfully 📢 </span>
  `,
  styles: [
    `
      .example-pizza-party {
        color: #fefefe;
      }
    `,
  ],
  standalone: true,
})
export class AddCampaignComponent {}
