import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignInfoComponent } from './campaign-info.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('CampaignInfoComponent', () => {
  let component: CampaignInfoComponent;
  let fixture: ComponentFixture<CampaignInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers:[{ provide: ActivatedRoute,
        useValue: {
            snapshot: {
                paramMap: {
                    get(): string {
                        return 'P001';
                    },
                },
            },
        },}]
    });
    fixture = TestBed.createComponent(CampaignInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
