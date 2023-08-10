import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { CampaignInterface } from "./types/campaign.interface";
import { SharedDataService } from "../services/data.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "./snackbar/snackbar/snackbar.component";
import { MessageService } from "../services/message-service.service";
import { Observable } from "rxjs";
@Component({
  selector: "app-campaign",
  templateUrl: "./manage-campaign.component.html",
  styleUrls: ["./manage-campaign.component.scss"],
})
export class ManageCampaignComponent implements OnInit {
  campaigns$?: Observable<CampaignInterface[]>;
  newCampaignName: string = "New Campaign";
  showForm: boolean = false;
  ascOrder = true;

  constructor(
    private dataService: SharedDataService,
    private _snackBar: MatSnackBar,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.campaigns$ = this.dataService.getCampaigns();
    this.messageService.errorOccurred.subscribe((errorMessage) => {
      this.openSnackBar(errorMessage);
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
        this.openSnackBar(`Campaign '${campaign.name}' added successfully 📢`);
      });
    this.toggleForm();
  }

  /**
   * toggle campaign-form component and related components
   */
  toggleForm() {
    this.showForm = !this.showForm;
    this.newCampaignName = "New Campaign";
  }

  /**
   * updates campaign name based on campaign-name changes in child component
   * @param {string} newName
   */

  onCampaignNameChange(newName: string) {
    this.newCampaignName = newName;
  }

  /**
   * Opens the snackbar component on adding a new campaign
   */
  openSnackBar(data: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 5 * 1000,
      data,
    });
  }
}
