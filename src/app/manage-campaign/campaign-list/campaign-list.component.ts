import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  ViewChild,
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
export class CampaignComponent implements OnChanges {
  dataSource = new MatTableDataSource<CampaignInterface>();
  @Input() campaigns!: CampaignInterface[];
  @Output() toggleForm = new EventEmitter<any>();
  isLoading?: boolean;

  constructor(private dataService: SharedDataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["campaigns"] && this.campaigns) {
      this.dataSource.data = this.campaigns;
      this.dataSource.sort = this.sort;
    }
  }
  displayedColumns = ["id", "name", "status", "ctr", "start date"];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  toggle() {
    this.toggleForm.emit();
  }
}
