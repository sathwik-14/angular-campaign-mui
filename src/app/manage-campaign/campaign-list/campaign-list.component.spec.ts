import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignListComponent } from './campaign-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CampaignListComponent', () => {
  let component: CampaignListComponent;
  let fixture: ComponentFixture<CampaignListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientModule
      ],
      declarations: [CampaignListComponent]
    });
    fixture = TestBed.createComponent(CampaignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
