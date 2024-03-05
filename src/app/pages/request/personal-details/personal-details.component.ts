import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PersonDetails } from 'src/app/domain/request/models/request';

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.scss'
})
export class PersonalDetailsComponent {
  @Input() personalDetails: PersonDetails | undefined;
}
