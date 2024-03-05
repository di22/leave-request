import { Component, Input } from '@angular/core';
import { RequestDetails, RequestType } from 'src/app/domain/request/models/request';
import { RequestDetailsRenderDirective } from './request-details-render/request-details-render.directive';

@Component({
  selector: 'app-request-details',
  standalone: true,
  imports: [RequestDetailsRenderDirective],
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.scss'
})
export class RequestDetailsComponent {
  @Input() requestType: RequestType | undefined;
  @Input() requestDetails: RequestDetails | undefined;
}
