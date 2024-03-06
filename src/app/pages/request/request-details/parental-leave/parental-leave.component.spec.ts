import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentalLeaveComponent } from './parental-leave.component';
import { Component } from '@angular/core';
import { ParentalLeaveDetails } from '@domain/request/models/request';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'app-test-parental-leave',
    standalone: true,
    template: `
<app-parental-leave [requestDetails]="requestDetails"></app-parental-leave>

`,
    imports: [ParentalLeaveComponent]
})
export class TestParentalLeaveComponent {
requestDetails: ParentalLeaveDetails = {
  "startDate": "2024-03-01",
  "endDate": "2025-02-28",
  "flexible": true,
  "numberOfMaximumFlexibleDays": 30
}
}

describe('ParentalLeaveComponent', () => {
  let component: TestParentalLeaveComponent;
  let fixture: ComponentFixture<TestParentalLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestParentalLeaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestParentalLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should has correct input value', () => {
    const parentalLeaveComponent = fixture.debugElement.query(By.directive(ParentalLeaveComponent));

    expect(parentalLeaveComponent.componentInstance.requestDetails).toEqual(component.requestDetails);
  });

  it('should init the date form', () => {
    const parentalLeaveComponent = fixture.debugElement.query(By.directive(ParentalLeaveComponent));

    expect(parentalLeaveComponent.componentInstance.form).toBeTruthy();
  });

  it('should display view mode', () => {
    const parentalLeaveComponent = fixture.debugElement.query(By.directive(ParentalLeaveComponent));
    const startDate = parentalLeaveComponent.query(By.css('[data-testid="start-date"]'));
    const endDate = parentalLeaveComponent.query(By.css('[data-testid="start-date"]'));
    const maxDays = parentalLeaveComponent.query(By.css('[data-testid="max-days"]'));

    const maxDaysError = parentalLeaveComponent.nativeElement.querySelector('[data-testid="max-days-error"]');

    const startDateInput = parentalLeaveComponent.query(By.css('[data-testid="start-date-input"]'));
    const endDateInput = parentalLeaveComponent.query(By.css('[data-testid="start-date-input"]'));

    expect(startDate).toBeTruthy();
    expect(endDate).toBeTruthy();
    expect(maxDays).toBeTruthy();

    // expect(maxDaysError).toEqual(`Please enter correct dates, You have only ${component.requestDetails.numberOfMaximumFlexibleDays} to leave`);
    expect(maxDaysError).toBeFalsy();
    expect(startDateInput).toBeFalsy();
    expect(endDateInput).toBeFalsy();
  });

  it('should display edit mode button', () => {
    const parentalLeaveComponent = fixture.debugElement.query(By.directive(ParentalLeaveComponent));
    const button = parentalLeaveComponent.query(By.css('button'));
    
    expect(button).toBeTruthy();
  });

  it('should display edit mode', () => {
    const parentalLeaveComponent = fixture.debugElement.query(By.directive(ParentalLeaveComponent));
    const button = parentalLeaveComponent.query(By.css('button')).nativeElement as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    const startDate = parentalLeaveComponent.query(By.css('[data-testid="start-date"]'));
    const endDate = parentalLeaveComponent.query(By.css('[data-testid="start-date"]'));
    const maxDays = parentalLeaveComponent.query(By.css('[data-testid="max-days"]'));

    const startDateInput = parentalLeaveComponent.query(By.css('[data-testid="start-date-input"]'));
    const endDateInput = parentalLeaveComponent.query(By.css('[data-testid="start-date-input"]'));

    expect(startDate).toBeFalsy();
    expect(endDate).toBeFalsy();
    expect(maxDays).toBeTruthy();

    expect(startDateInput).toBeTruthy();
    expect(endDateInput).toBeTruthy();
  });

  it('should validate over dates range and show the error message', () => {
    const parentalLeaveComponent = fixture.debugElement.query(By.directive(ParentalLeaveComponent));
    const button = parentalLeaveComponent.query(By.css('button')).nativeElement as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    const maxDaysError = parentalLeaveComponent.nativeElement.querySelector('[data-testid="max-days-error"]');

    expect(maxDaysError.textContent).toEqual(`Please enter correct dates, You have only ${component.requestDetails.numberOfMaximumFlexibleDays} to leave`);
  });

  it('should validate over dates range and hide the error message', () => {
    const parentalLeaveComponent = fixture.debugElement.query(By.directive(ParentalLeaveComponent));
    const button = parentalLeaveComponent.query(By.css('button')).nativeElement as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    parentalLeaveComponent.componentInstance.endDate.setValue('2024-03-10');
    fixture.detectChanges();

    const maxDaysError = parentalLeaveComponent.nativeElement.querySelector('[data-testid="max-days-error"]');

    expect(maxDaysError).toBeFalsy();
  });

  it('should hide edit mode button', async () => {
    component.requestDetails = {
      "startDate": "2024-03-01",
      "endDate": "2025-02-28",
      "flexible": false,
      "numberOfMaximumFlexibleDays": 30
    }
    
    await fixture.whenStable();
    fixture.detectChanges();

    const parentalLeaveComponent = fixture.debugElement.query(By.directive(ParentalLeaveComponent));
    const button = parentalLeaveComponent.query(By.css('button'));
    
    expect(button).toBeFalsy();
  });
});
