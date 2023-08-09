import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CampaignFormComponent } from './campaign-form.component';
import { MatStepperModule } from '@angular/material/stepper';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CampaignFormComponent', () => {
  let component: CampaignFormComponent;
  let fixture: ComponentFixture<CampaignFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas:[NO_ERRORS_SCHEMA],
      declarations: [CampaignFormComponent],
      imports: [HttpClientModule,MatStepperModule,BrowserAnimationsModule]
    });
    fixture = TestBed.createComponent(CampaignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
