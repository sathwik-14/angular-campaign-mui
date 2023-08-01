import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';
import { CampaignInfoComponent } from './campaign-info/campaign-info.component';
import { CampaignComponent } from './campaign-list/campaign.component';
import { SharedDataService } from '../services/data.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card'
import { MatStepperModule } from '@angular/material/stepper'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox'
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    CampaignFormComponent,
    CampaignInfoComponent,
    CampaignComponent
  ],
  imports: [
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatStepperModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [ SharedDataService]
})
export class CampaignModule { }
