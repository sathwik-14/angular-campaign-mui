import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  ViewChild,
  AfterContentInit,
} from "@angular/core";
import { CampaignInterface } from "../types/campaign.interface";
import { SharedDataService } from "../../services/data.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-campaign-list",
  templateUrl: "./campaign-list.component.html",
  styleUrls: ["./campaign-list.component.scss"],
})
export class CampaignListComponent implements  AfterContentInit, OnChanges {
  dataSource = new MatTableDataSource<CampaignInterface>();
  displayedColumns = ["id", "name", "status", "ctr", "start date"];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @Input() campaigns!: CampaignInterface[];
  @Output() toggleForm = new EventEmitter<any>();
  isLoading = true;

  constructor(private dataService: SharedDataService) {
    this.isLoading = true
  }


  ngAfterContentInit(): void {
    this.isLoading = true
  }



  /**
   * set updated data to table dataSource 
   * @param {any} changes:SimpleChanges
   */
  ngOnChanges(changes: SimpleChanges): void {
      this.dataSource.data = this.campaigns;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
      console.log('hello')
  }

  /**
   * toggle form to show/hide campaign list
   */
  toggle() {
    this.toggleForm.emit();
  }
}
