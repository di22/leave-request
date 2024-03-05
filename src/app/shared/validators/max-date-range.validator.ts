import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const maxDateRangeValidator = (maxDays: number): ValidatorFn => {
  return (control: AbstractControl) : ValidationErrors | null => {

    const value: {startDate: string, endDate: string} = control.value;

    if (!value?.startDate && value?.endDate) return null;

    const startDate: Date = new Date(value.startDate);
    const endDate: Date = new Date(value.endDate);

    const time = Math.abs(startDate.getTime() - endDate.getTime());
    const daysBetween = Math.ceil(time / (1000 * 60 * 60 * 24)); 

    const validDays: boolean = daysBetween <= maxDays;

    return validDays ? null : {maxDaysInvalid: true};
  }
}