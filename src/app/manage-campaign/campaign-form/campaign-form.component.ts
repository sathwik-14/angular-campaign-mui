import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { SharedDataService } from 'src/app/services/data.service';
import { CampaignInterface } from '../types/campaign.interface';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss'],
})
export class CampaignFormComponent {

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private dataservice: SharedDataService,
    private fb: FormBuilder,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }



  campaignForm = this.fb.group({
    name: ['', Validators.required],
    objective: ['', Validators.required],
    categorySelect: ['select'],
    offerSelect: ['select'],
    comments: [''],
    locations: this.fb.array([]),
  });


  get locations() {
    return this.campaignForm.get('locations') as FormArray;
  }

  get name() {
    return this.campaignForm.get('name');
  }

  get objective() {
    return this.campaignForm.get('objective');
  }

  @Input() showForm!: boolean;
  @Input() campaignName: any;
  @Output() toggleForm = new EventEmitter<boolean>();
  @Output() campaignNameChange = new EventEmitter<string>();
  @Output() addCampaign = new EventEmitter<CampaignInterface>();
  newCampaign: any
  category: boolean = false;
  categories = ['first', 'second', 'third'];
  edit: boolean = false;
  showFirstPage: boolean = true;
  showSecondPage: boolean = false;
  showThirdPage: boolean = false;
  showFourthPage: boolean = false;
  browse: boolean = false;
  application: boolean = false;


  toggleBrowse() {
    this.browse = !this.browse;
  }

  toggleCategory() {
    this.category = true;
  }

  toggleApplication() {
    this.toggleCategory();
    this.application = true;
  }

  updateCampaignName() {
    this.campaignName = this.campaignForm.value.name;
    this.campaignNameChange.emit(this.campaignName);
  }

  editableIndex: number | null = null;

  toggleEditable(index: number | null): void {
    this.editableIndex = this.editableIndex === index ? null : index;
  }

  isEditable(index: number): boolean {
    return this.editableIndex === index;
  }

  addLocation(place: any) {
    this.locations.push(this.fb.control(place.value));
    place.value = '';
  }

  onCategoryChange(event: any) {
    const selectedValue = event.target.value;
    this.campaignForm.value.categorySelect = selectedValue.split(':')[1];
  }

  onOfferChange(event: any) {
    const selectedValue = event.target.value;
    this.campaignForm.value.offerSelect = selectedValue.split(':')[1];
  }

  deleteLocation(i: any) {
    this.locations.removeAt(i);
  }

  submitted: boolean = false;

  toggle () {
    this.toggleForm.emit(false);  
  }

  submitForm() {
    this.submitted = true;
    if (this.campaignForm.valid) {
        this.newCampaign = {
          name: this.campaignForm.value.name,
          objective: this.campaignForm.value.objective,
          comment: this.campaignForm.value.comments,
          category: this.campaignForm.value.categorySelect,
          offer: this.campaignForm.value.offerSelect,
          location: this.campaignForm.get('locations')?.value,
        };
        this.addCampaign.emit(this.newCampaign);
        this.showForm = false;
        this.toggleForm.emit(this.showForm);  
    } else {
      this.submitted = false;
    }
  }
}
