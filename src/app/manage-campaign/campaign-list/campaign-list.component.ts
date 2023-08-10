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
import { Observable } from "rxjs";

@Component({
  selector: "app-campaign-list",
  templateUrl: "./campaign-list.component.html",
  styleUrls: ["./campaign-list.component.scss"],
})
export class CampaignListComponent implements OnInit {
  dataSource = new MatTableDataSource<CampaignInterface>();
  displayedColumns = ["id", "name", "status", "ctr", "start date"];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @Input() campaigns?: Observable<CampaignInterface[]>;
  @Output() toggleForm = new EventEmitter<any>();
  isLoading = true;

  constructor(private dataService: SharedDataService) {}

  /**
   * Set data to data source of table
   */
  ngOnInit(): void {
    this.isLoading = true;
    this.campaigns?.subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  /**
   * toggle form to show/hide campaign list
   */
  toggle() {
    this.toggleForm.emit();
  }
}
