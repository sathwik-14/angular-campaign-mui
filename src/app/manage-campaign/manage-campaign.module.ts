import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CampaignFormComponent } from "./campaign-form/campaign-form.component";
import { CampaignListComponent } from "./campaign-list/campaign-list.component";
import { SharedDataService } from "../services/data.service";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatCardModule } from "@angular/material/card";
import { MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { ManageCampaignRouting } from "./manage-campaign-routing.module";
import { ManageCampaignComponent } from "./manage-campaign.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
@NgModule({
  declarations: [
    CampaignFormComponent,
    CampaignListComponent,
    ManageCampaignComponent,
  ],
  imports: [
    MatSnackBarModule,
    MatProgressSpinnerModule,
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
    RouterModule,
    ManageCampaignRouting,
  ],
  providers: [SharedDataService],
  exports: [CampaignFormComponent]
})
export class CampaignModule {}
