import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './date-field.component.html'
})
export class DateFieldComponent {
  @Input() control: FormControl = new FormControl('');
  @Input() label: string;
}
