import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestDetailsComponent } from './request-details.component';
import { Component } from '@angular/core';
import { RequestDetails, RequestType } from '@domain/request/models/request';
import { By } from '@angular/platform-browser';
import { InternalMobilityComponent } from './internal-mobility/internal-mobility.component';
import { IllinessComponent } from './illiness/illiness.component';
import { ParentalLeaveComponent } from './parental-leave/parental-leave.component';

@Component({
    selector: 'app-test-request-details',
    standalone: true,
    template: `
<app-request-details [requestType]="type" [requestDetails]="requestDetails"></app-request-details>

`,
    providers: [],
    imports: [RequestDetailsComponent]
})
export class TestRequestDetailsComponent {
  type: RequestType = 'INTERNAL_MOBILITY';
  requestDetails: RequestDetails = {
    "desiredStartDate": "2023-01-02",
    "from": "Mumbai IT center",
    "to": "Amsterdam IT Operations"
}
}

describe('RequestDetailsComponent', () => {
  let component: TestRequestDetailsComponent;
  let fixture: ComponentFixture<TestRequestDetailsComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRequestDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestRequestDetailsComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has correct input value', () => {
    const requestDetailsComponent = fixture.debugElement.query(By.directive(RequestDetailsComponent));

    expect(requestDetailsComponent.componentInstance.requestType).toEqual(component.type);
    expect(requestDetailsComponent.componentInstance.requestDetails).toEqual(component.requestDetails);
  });

  it('should render a dynamic component based on the type', () => {
    const internalMobilityComponent = fixture.debugElement.query(By.directive(InternalMobilityComponent));
   
    expect(internalMobilityComponent).toBeTruthy();
  });

  it('should render one dynamic component based on the type', () => {
    const internalMobilityComponent = fixture.debugElement.query(By.directive(InternalMobilityComponent));
    const illnessComponent = fixture.debugElement.query(By.directive(IllinessComponent));
    const parentalLeaveComponent = fixture.debugElement.query(By.directive(ParentalLeaveComponent));

    expect(internalMobilityComponent).toBeTruthy();
    expect(illnessComponent).toBeFalsy();
    expect(parentalLeaveComponent).toBeFalsy();
  });

  it('should render the target dynamic component based on the type one time', () => {
    const internalMobilityComponents = fixture.debugElement.queryAll(By.directive(InternalMobilityComponent));

    expect(internalMobilityComponents.length).toEqual(1);
  });

    
  it('should pass to the dynamic component correct input values', () => {
    const internalMobilityComponent = fixture.debugElement.query(By.directive(InternalMobilityComponent));
   
    expect(internalMobilityComponent.componentInstance.requestDetails).toEqual(component.requestDetails);
  });
});
