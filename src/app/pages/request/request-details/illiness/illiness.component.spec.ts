import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllinessComponent } from './illiness.component';
import { Component, DebugElement, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BooleanToTextPipe } from '@shared/pipes/boolean-to-text.pipe';
import { IllnessDetails } from '@domain/request/models/request';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'app-test-illiness',
    standalone: true,
    template: `
<app-illiness [requestDetails]="requestDetails"></app-illiness>

`,
    providers: [DatePipe, BooleanToTextPipe],
    imports: [IllinessComponent]
})
export class TestIllinessComponent {
requestDetails: IllnessDetails = {
  "startDate": "2024-03-01",
  "endDate": "2024-03-14",
  "longTerm": false,
  "medicalDocumentRequired": true
}

datePip = inject(DatePipe);
booleanPipe = inject(BooleanToTextPipe);
}

describe('IllinessComponent', () => {
  let component: TestIllinessComponent;
  let fixture: ComponentFixture<TestIllinessComponent>;
  let illinessComponent: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestIllinessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestIllinessComponent);
    component = fixture.componentInstance;
    illinessComponent = fixture.debugElement.query(By.directive(IllinessComponent));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has correct input value', () => {
    expect(illinessComponent.componentInstance.requestDetails).toEqual(component.requestDetails);
  });

  it('should render start date with format', () => {
    const date = illinessComponent.query(By.css('[data-testid="start-date"]'));

    expect(date.componentInstance.value).toEqual(component.datePip.transform(component.requestDetails.startDate, 'dd-MM-yyyy'));
  });

  it('should render end date with format', () => {
    const date = illinessComponent.query(By.css('[data-testid="end-date"]'));

    expect(date.componentInstance.value).toEqual(component.datePip.transform(component.requestDetails.endDate, 'dd-MM-yyyy'));
  });

  it('should render long term with format', () => {
    const longTerm = illinessComponent.query(By.css('[data-testid="long-term"]'));

    expect(longTerm.componentInstance.value).toEqual(component.booleanPipe.transform(component.requestDetails.longTerm));
  });

  it('should render medical required with format', () => {
    const longTerm = illinessComponent.query(By.css('[data-testid="medical-required"]'));

    expect(longTerm.componentInstance.value).toEqual(component.booleanPipe.transform(component.requestDetails.medicalDocumentRequired));
  });
});
