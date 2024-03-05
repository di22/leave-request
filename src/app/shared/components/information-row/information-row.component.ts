import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-information-row',
  standalone: true,
  imports: [],
  templateUrl: './information-row.component.html',
  styleUrl: './information-row.component.scss'
})
export class InformationRowComponent {
  @Input() key: string;
  @Input() value: number | string | null;
}
