import { Directive, Input, OnChanges, ViewContainerRef, inject } from '@angular/core';
import { RequestDetails, RequestType } from '@domain/request/models/request';
import { IllinessComponent } from '../illiness/illiness.component';
import { InternalMobilityComponent } from '../internal-mobility/internal-mobility.component';
import { ParentalLeaveComponent } from '../parental-leave/parental-leave.component';

@Directive({
  selector: '[appRequestDetailsRender]',
  standalone: true
})
export class RequestDetailsRenderDirective implements OnChanges {
  @Input() requestType: RequestType | undefined;
  @Input() requestDetails: RequestDetails | undefined;

  requestDetailsTypes: {[key in RequestType]: any} = {
    'INTERNAL_MOBILITY': InternalMobilityComponent,
    'PARENTAL_LEAVE': ParentalLeaveComponent,
    'ILLNESS': IllinessComponent
  }

  private readonly viewContainerRef: ViewContainerRef = inject(ViewContainerRef);

  constructor() { }

  ngOnChanges(): void {
    if(this.requestType && this.requestDetails) {
      if(this.requestDetailsTypes[this.requestType]) {
      const targetComponent = this.requestDetailsTypes[this.requestType];
       const component = this.viewContainerRef.createComponent<typeof targetComponent>(targetComponent);
       component.instance.requestDetails = this.requestDetails;
      }
    }
  }
}
