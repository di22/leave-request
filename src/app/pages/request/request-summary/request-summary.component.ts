import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RequestType } from '@domain/request/models/request';
import { ToTitlePipe } from '@shared/pipes/to-title.pipe';

@Component({
  selector: 'app-request-summary',
  standalone: true,
  imports: [CommonModule, ToTitlePipe],
  templateUrl: './request-summary.component.html',
  styleUrl: './request-summary.component.scss'
})
export class RequestSummaryComponent {
  @Input() requestType: RequestType | '';
}
