import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCampaignComponent } from './manage-campaign.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ManageCampaignComponent', () => {
  let component: ManageCampaignComponent;
  let fixture: ComponentFixture<ManageCampaignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ManageCampaignComponent],
      imports: [HttpClientModule,MatSnackBarModule],
    });
    fixture = TestBed.createComponent(ManageCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
