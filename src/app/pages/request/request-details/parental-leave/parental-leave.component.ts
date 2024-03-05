import { Component, Input, OnInit } from '@angular/core';
import { ParentalLeaveDetails } from 'src/app/domain/request/models/request';
import { InformationRowComponent } from "../../../../shared/components/information-row/information-row.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateFieldComponent } from "../../../../shared/components/date-field/date-field.component";
import { maxDateRangeValidator } from 'src/app/shared/validators/max-date-range.validator';

@Component({
    selector: 'app-parental-leave',
    standalone: true,
    templateUrl: './parental-leave.component.html',
    styleUrl: './parental-leave.component.scss',
    imports: [CommonModule, InformationRowComponent, DateFieldComponent]
})
export class ParentalLeaveComponent implements OnInit {
  @Input() requestDetails: ParentalLeaveDetails;
  startDate: FormControl = new FormControl();
  endDate: FormControl = new FormControl();
  form: FormGroup;
  editMode: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      startDate: [],
      endDate: []
    });

    this.startDate = this.form.get('startDate') as FormControl;
    this.endDate = this.form.get('endDate') as FormControl;
  }

  renderDates(): void {
    this.editMode = !this.editMode;

    if(this.editMode) {
      this.form.addValidators(maxDateRangeValidator(this.requestDetails.numberOfMaximumFlexibleDays));
      this.startDate.setValue(this.requestDetails.startDate);
      this.endDate.setValue(this.requestDetails.endDate);
    } else {
      this.form.removeValidators(maxDateRangeValidator(this.requestDetails.numberOfMaximumFlexibleDays));
      this.form.reset();
    }

    console.log(434)
  }
}
