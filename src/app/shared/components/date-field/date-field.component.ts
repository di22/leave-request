import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './date-field.component.html',
  styleUrl: './date-field.component.scss'
})
export class DateFieldComponent {
  @Input() control: FormControl;
  @Input() label: string;
}
