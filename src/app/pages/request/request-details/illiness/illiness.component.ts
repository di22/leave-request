import { Component, Input } from '@angular/core';
import { InformationRowComponent } from "../../../../shared/components/information-row/information-row.component";
import { IllnessDetails } from '@domain/request/models/request';
import { CommonModule } from '@angular/common';
import { BooleanToTextPipe } from '@shared/pipes/boolean-to-text.pipe';

@Component({
    selector: 'app-illiness',
    standalone: true,
    templateUrl: './illiness.component.html',
    imports: [CommonModule, InformationRowComponent, BooleanToTextPipe]
})
export class IllinessComponent {
  @Input() requestDetails: IllnessDetails;
}
