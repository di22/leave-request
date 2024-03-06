import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestComponent } from './request.component';
import { HttpClientModule } from '@angular/common/http';
import { RequestService } from '@domain/request/request.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RequestSummaryComponent } from './request-summary/request-summary.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { RequestHistoryComponent } from './request-history/request-history.component';

const request = { 
  "id": "1",
  "type": "INTERNAL_MOBILITY",
  "personDetails": {
      "fistName": "John",
      "lastName": "Doe",
      "birthDay": "1988-12-12",
      "position": "Software Engineer"
  },
  "requestDetails": {
      "desiredStartDate": "2023-01-02",
      "from": "Mumbai IT center",
      "to": "Amsterdam IT Operations"
  },
  "history": [
      {
          "created": "2022-11-12T14:00:11Z",
          "status": "SUBMITTED"
      },
      {
          "created": "2022-11-15T13:02:22Z",
          "status": "APPROVED_BY_MANAGER" 
      }
  ] 
};

const fakeRequestService = {
  getRequest: (id: number) => {
    if(id === 1) {
      return of(request)
    } else {
      return throwError(() => {
        return new Error(`request not exist`);
      })
    }
  }
}

describe('RequestComponent', () => {
  let component: RequestComponent;
  let fixture: ComponentFixture<RequestComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestComponent, HttpClientModule],
      providers: [
        {
          provide: RequestService,
          useValue: fakeRequestService
       }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error', () => {
    const error = compiled.querySelector('[data-testid="request-failed-error"]');
    expect(error?.textContent).toEqual('Please try a valid request ID');
    expect(component.requestFailed).toBeTruthy();
  });

  it('should success on call for request', async () => {
    jest.spyOn(component, 'getRequest');
    component.getRequest(1);
    await fixture.whenStable();
    fixture.detectChanges();

    const error = compiled.querySelector('[data-testid="request-failed-error"]');
    expect(error).toBeFalsy();
    expect(component.getRequest).toHaveBeenCalledWith(1);
    expect(component.request).toBeTruthy();
    expect(component.requestFailed).toBeFalsy();
  });

  it('should display request details components', async () => {
    jest.spyOn(component, 'getRequest');
    component.getRequest(1);
    await fixture.whenStable();
    fixture.detectChanges();

    const summaryComponent = compiled.querySelector('app-request-summary');
    const personalDetailsComponent = compiled.querySelector('app-personal-details');
    const requestDetailsComponent = compiled.querySelector('app-request-details');
    const requestHistoryComponent = compiled.querySelector('app-request-history');
   
    expect(component.getRequest).toHaveBeenCalledWith(1);
    expect(summaryComponent).toBeTruthy();
    expect(personalDetailsComponent).toBeTruthy();
    expect(requestDetailsComponent).toBeTruthy();
    expect(requestHistoryComponent).toBeTruthy();
  });

  it('should render summary component with its inputs', async () => {
    jest.spyOn(component, 'getRequest');
    component.getRequest(1);
    await fixture.whenStable();
    fixture.detectChanges();

    const targetComponent = fixture.debugElement.query(By.directive(RequestSummaryComponent));
   
    expect(component.getRequest).toHaveBeenCalledWith(1);
    expect(targetComponent.componentInstance.requestType).toBeTruthy();
    expect(targetComponent.componentInstance.requestType).toEqual(request.type);
  });

  it('should render personal details component with its inputs', async () => {
    jest.spyOn(component, 'getRequest');
    component.getRequest(1);
    await fixture.whenStable();
    fixture.detectChanges();

    const targetComponent = fixture.debugElement.query(By.directive(PersonalDetailsComponent));
   
    expect(component.getRequest).toHaveBeenCalledWith(1);
    expect(targetComponent.componentInstance.personalDetails).toBeTruthy();
    expect(targetComponent.componentInstance.personalDetails).toEqual(request.personDetails);
  });

  it('should render request details component with its inputs', async () => {
    jest.spyOn(component, 'getRequest');
    component.getRequest(1);
    await fixture.whenStable();
    fixture.detectChanges();

    const targetComponent = fixture.debugElement.query(By.directive(RequestDetailsComponent));
   
    expect(component.getRequest).toHaveBeenCalledWith(1);
    expect(targetComponent.componentInstance.requestType).toBeTruthy();
    expect(targetComponent.componentInstance.requestType).toEqual(request.type);

    expect(targetComponent.componentInstance.requestDetails).toBeTruthy();
    expect(targetComponent.componentInstance.requestDetails).toEqual(request.requestDetails);
  });

  it('should render request history component with its inputs', async () => {
    jest.spyOn(component, 'getRequest');
    component.getRequest(1);
    await fixture.whenStable();
    fixture.detectChanges();

    const targetComponent = fixture.debugElement.query(By.directive(RequestHistoryComponent));
   
    expect(component.getRequest).toHaveBeenCalledWith(1);
    expect(targetComponent.componentInstance.requestHistoryList).toBeTruthy();
    expect(targetComponent.componentInstance.requestHistoryList.length).toEqual(request.history.length);
  });
});
