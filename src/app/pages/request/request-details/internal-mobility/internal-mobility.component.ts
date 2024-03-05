import { Component, Input } from '@angular/core';
import { InternalMobilityDetails } from 'src/app/domain/request/models/request';
import { InformationRowComponent } from "../../../../shared/components/information-row/information-row.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-internal-mobility',
    standalone: true,
    templateUrl: './internal-mobility.component.html',
    imports: [CommonModule, InformationRowComponent]
})
export class InternalMobilityComponent {
  @Input() requestDetails: InternalMobilityDetails;
}
