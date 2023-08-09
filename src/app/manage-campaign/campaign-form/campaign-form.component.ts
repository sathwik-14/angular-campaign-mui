import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormArray } from "@angular/forms";
import { SharedDataService } from "src/app/services/data.service";
import { CampaignInterface } from "../types/campaign.interface";
import {
  StepperOrientation,
} from "@angular/material/stepper";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Router } from "@angular/router";
@Component({
  selector: "app-campaign-form",
  templateUrl: "./campaign-form.component.html",
  styleUrls: ["./campaign-form.component.scss"],
})
export class CampaignFormComponent implements OnInit{
  @Input() showForm!: boolean;
  @Input() campaignName: any;
  @Input() editData: any ;
  @Output() toggleForm = new EventEmitter<boolean>();
  @Output() campaignNameChange = new EventEmitter<string>();
  @Output() addCampaign = new EventEmitter<CampaignInterface>();
  campaignForm:any;
  newCampaign: any;
  category: boolean = false;
  categories = ["first", "second", "third"];
  edit: boolean = false;
  browse: boolean = false;
  application: boolean = false;
  stepperOrientation: Observable<StepperOrientation>;

  ngOnInit(): void {
    if(this.editData){
      this.campaignForm = this.fb.group({
        name: [this.editData.name, Validators.required],
        objective: [this.editData.objective, Validators.required],
        categorySelect: [this.editData.category],
        offerSelect: [this.editData.offer],
        comments: [this.editData.comment],
        locations: this.editData.location?this.fb.array([...this.editData.location]):this.fb.array([]),
      });
    }else {
      this.campaignForm = this.fb.group({
        name: ["", Validators.required],
        objective: ["", Validators.required],
        categorySelect: ["select"],
        offerSelect: ["select"],
        comments: [""],
        locations: this.fb.array([]),
      });
    }
  }

  constructor(
    private dataservice: SharedDataService,
    private router: Router,
    private fb: FormBuilder,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe("(min-width: 800px)")
      .pipe(map(({ matches }) => (matches ? "horizontal" : "vertical")));
  }



  /**
   * getter for the location
   * @returns {any} a form array
   */
  get locations() {
    return this.campaignForm.get("locations") as FormArray;
  }

  /**
   * getter for the campaign name
   * @returns {any} value of name form element
   */
  get name() {
    return this.campaignForm.get("name");
  }

  /**
   * getter for the campaign objective
   * @returns {any} value of objective form element
   */
  get objective() {
    return this.campaignForm.get("objective");
  }

  /**
   * Update campaign name in the parent component
   */
  updateCampaignName() {
    this.campaignName = this.campaignForm.value.name;
    this.campaignNameChange.emit(this.campaignName);
  }

  editableIndex: number | null = null;

  /**
   * toggles input readonly property by returning true or null
   * @param {any} index:number|null
   * @returns {any}
   */
  toggleEditable(index: number | null): void {
    this.editableIndex = this.editableIndex === index ? null : index;
  }

  /**
   * Returns true or false depending on index
   * @param {any} index:number
   * @returns {any} editableIndex - returns true
   */
  isEditable(index: number): boolean {
    return this.editableIndex === index;
  }

  /**
   * stores location data to locations form array
   * @param {$event} place-is an event that holds value of the input tag
   */
  addLocation(place: any) {
    this.locations.push(this.fb.control(place.value));
    place.value = "";
  }

  /**
   * Description
   * @param {any} i- index of location inside locations array
   */
  deleteLocation(i: any) {
    this.locations.removeAt(i);
  }

  /**
   * toggle function lets show/hide form component
   */
  toggle() {
    this.toggleForm.emit(false);
  }

  // Your onInputValueChanged function
  onInputValueChanged(newValue: string, index: number): void {
    const control = this.locations.at(index);
    control.setValue(newValue); // Update the value of the form control
  }


  /**
   * Form data is stored in an object and sent to the parent component
   */
  submitForm() {
    this.newCampaign = {
      name: this.campaignForm.value.name,
      objective: this.campaignForm.value.objective,
      comment: this.campaignForm.value.comments,
      category: this.campaignForm.value.categorySelect,
      offer: this.campaignForm.value.offerSelect,
      location: this.campaignForm.get("locations")?.value,
    };
    this.addCampaign.emit(this.newCampaign);
  }
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
}
