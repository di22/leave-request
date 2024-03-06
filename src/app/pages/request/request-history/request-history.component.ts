import { Component, Input } from '@angular/core';
import { History, HistoryStatus } from '@domain/request/models/request';
import { InformationRowComponent } from "../../../shared/components/information-row/information-row.component";
import { CommonModule } from '@angular/common';
import { ToTitlePipe } from "@shared/pipes/to-title.pipe";

@Component({
    selector: 'app-request-history',
    standalone: true,
    templateUrl: './request-history.component.html',
    styleUrl: './request-history.component.scss',
    imports: [CommonModule, InformationRowComponent, ToTitlePipe]
})
export class RequestHistoryComponent {
  @Input() requestHistoryList: History[];
  icons: {[key in HistoryStatus]: string} = {
    'APPROVED_BY_MANAGER': 'check-mark-svgrepo-com.svg',
    'SUBMITTED': 'letter-svgrepo-com.svg',
    'REJECTED_BY_MANAGER': 'x-thin-svgrepo-com.svg'
  }
}
