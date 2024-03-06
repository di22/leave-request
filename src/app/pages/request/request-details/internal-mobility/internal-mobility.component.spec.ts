import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalMobilityComponent } from './internal-mobility.component';
import { Component, inject } from '@angular/core';
import { InternalMobilityDetails } from '@domain/request/models/request';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-test-internal-mobility',
    standalone: true,
    template: `
<app-internal-mobility [requestDetails]="requestDetails"></app-internal-mobility>

`,
providers: [DatePipe],
    imports: [InternalMobilityComponent]
})
export class TestInternalMobilityComponent {
requestDetails: InternalMobilityDetails = {
  "desiredStartDate": "2024-01-02",
  "from": "Ground operations",
  "to": "Flight operations"
}

datePip = inject(DatePipe);
}

describe('InternalMobilityComponent', () => {
  let component: TestInternalMobilityComponent;
  let fixture: ComponentFixture<TestInternalMobilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestInternalMobilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestInternalMobilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should has correct input value', () => {
    const internalMobilityComponent = fixture.debugElement.query(By.directive(InternalMobilityComponent));

    expect(internalMobilityComponent.componentInstance.requestDetails).toEqual(component.requestDetails);
  });

  it('should render status date', () => {
    const internalMobilityComponent = fixture.debugElement.query(By.directive(InternalMobilityComponent));
    const date = internalMobilityComponent.query(By.css('[data-testid="start-date"]'));

    expect(date).toBeTruthy();
  });

  it('should render start date with format', () => {
    const internalMobilityComponent = fixture.debugElement.query(By.directive(InternalMobilityComponent));

    const date = internalMobilityComponent.query(By.css('[data-testid="start-date"]'));

    expect(date.componentInstance.value).toEqual(component.datePip.transform(component.requestDetails.desiredStartDate, 'dd-MM-yyyy'));
  });
});
