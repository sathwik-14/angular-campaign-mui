import { Component, Inject, OnInit} from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { SharedDataService } from "src/app/services/data.service";
import { CampaignInterface } from "../types/campaign.interface";
import { Router } from "@angular/router";
import { CommonModule, NgIf } from "@angular/common";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CampaignModule } from "../manage-campaign.module";

export interface DialogData {
  name: string;
  id: string;
}

@Component({
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    CampaignModule,
  ],
  selector: "app-campaign-info",
  templateUrl: "./campaign-info.component.html",
  styleUrls: ["./campaign-info.component.scss"],
})
export class CampaignInfoComponent implements OnInit {
  newCampaignName = "new";
  showForm = false;
  result = false;
  showAlert = false;
  itemId!: string;
  campaigns!: CampaignInterface[];
  deleted: boolean = false;
  constructor(
    private sharedDataService: SharedDataService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}
  foundObject!: any;

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get("id")!;
    this.getUpdatedData();
  }

  getUpdatedData() {
    this.sharedDataService.getCampaign(this.itemId).subscribe((data) => {
      this.foundObject = data;
      this.result = true;
      console.log("updated")
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  /**
   * Opens a standalone dialog component that acts as alert for deletion operation
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { name: this.foundObject.name, id: this.foundObject.id },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  /**
   * add a new campaign and get the updated data from dataService
   * @param {CampaignInterface} newCampaign
   */
  updateCampaign(newCampaign: CampaignInterface) {
    this.toggleForm()
    this.sharedDataService
      .getCampaign(this.foundObject.id)
      .subscribe((data) => {
        this.result = false;
        this.foundObject=''
        newCampaign.id = data.id;
        newCampaign.status = data.status;
        newCampaign.ctr = data.ctr;
        newCampaign["start date"] = data["start date"];
        this.sharedDataService
          .updateCampaign(newCampaign as CampaignInterface)
          .subscribe((campaign: any) => {
            this.getUpdatedData()
          });
      });
  }

  /**
   * Navigate to the campaign page
   */
  goBack() {
    this.router.navigate(["/campaign"]);
  }
}

@Component({
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    NgIf,
    MatButtonModule,
    RouterModule,
    MatIconModule,
  ],
  providers: [SharedDataService],
  selector: "dialog-overview-example-dialog",
  template: `
    <div
      mat-dialog-title
      class="d-flex align-items-center gap-2"
      style="color: red;vertical-align:middle;"
    >
      <mat-icon fontIcon="error"></mat-icon>
      <div>Confirm Delete</div>
    </div>
    <p mat-dialog-content>
      Are you sure you want to delete {{ data.name }} campaign ?
    </p>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button color="warn" (click)="deleteData()" cdkFocusInitial>
        Delete
        <mat-icon fontIcon="delete"></mat-icon>
      </button>
    </div>
  `,
  styleUrls: ["./campaign-info.component.scss"],
})
export class DialogOverviewExampleDialog {
  constructor(
    private sharedDataService: SharedDataService,
    private router: Router,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  deleteData() {
    this.sharedDataService.deleteCampaign(this.data.id).subscribe();
    this.onNoClick();
    this.router.navigate(["/campaign"]);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
