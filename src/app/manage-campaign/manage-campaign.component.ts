import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { CampaignInterface } from "./types/campaign.interface";
import { SharedDataService } from "../services/data.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "./snackbar/snackbar/snackbar.component";
import { MessageService } from "../services/message-service.service";
@Component({
  selector: "app-campaign",
  templateUrl: "./manage-campaign.component.html",
  styleUrls: ["./manage-campaign.component.scss"],
})
export class ManageCampaignComponent implements OnInit {
  constructor(
    private dataService: SharedDataService,
    private _snackBar: MatSnackBar,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dataService.getCampaigns().subscribe((data) => {
      this.campaigns = data;
      this.cdr.detectChanges(); // Manually trigger change detection
    });
    this.messageService.errorOccurred.subscribe((errorMessage) => {
      this.openSnackBar(errorMessage);
    });
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
    this.getCampaignData();
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
