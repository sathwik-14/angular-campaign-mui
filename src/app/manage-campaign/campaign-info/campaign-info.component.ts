import { Component, Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SharedDataService } from 'src/app/services/data.service';
import { CampaignInterface } from '../types/campaign.interface';
import { Router } from '@angular/router';
import { CommonModule,NgIf } from '@angular/common';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface DialogData {
  name: string;
  id:string;
}

@Component({
  selector: 'app-campaign-info',
  templateUrl: './campaign-info.component.html',
  styleUrls: ['./campaign-info.component.scss'],
})
export class CampaignInfoComponent implements OnInit {
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
    this.itemId = this.route.snapshot.paramMap.get('id')!;
    this.sharedDataService.getData().subscribe((data) => {
      this.campaigns = data;
    });
    this.foundObject = this.campaigns.find((obj) => obj['id'] === this.itemId)!;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { name: this.foundObject.name , id:this.foundObject.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }


  goBack() {
    this.router.navigate(['/campaign']);
  }
}

@Component({
  standalone: true,
  imports: [MatDialogModule, CommonModule,NgIf, MatButtonModule,RouterModule,MatIconModule],
  providers:[SharedDataService],
  selector: 'dialog-overview-example-dialog',
  template: `
    <div mat-dialog-title>Confirm Delete</div>
    <p mat-dialog-content>
      Are you sure you want to delete {{ data.name }} campaign ?
    </p>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button color="warn"  (click)="deleteData()"  cdkFocusInitial>
        Delete
        <mat-icon fontIcon="delete"></mat-icon>
      </button>
    </div>
  `,
  styleUrls: ['./campaign-info.component.scss'],
})
export class DialogOverviewExampleDialog {
  deleted: boolean = false;
  constructor(private sharedDataService: SharedDataService,
    private router: Router,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  deleteData() {
    this.deleted = true;
    setTimeout(() => {
      this.sharedDataService.deleteData(this.data.id);
      this.onNoClick()
      this.router.navigate(['/campaign']);
    }, 1000);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
