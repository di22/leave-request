import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestHistoryComponent } from './request-history.component';
import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ToTitlePipe } from '@shared/pipes/to-title.pipe';
import { History } from '@domain/request/models/request';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'app-test-history',
    standalone: true,
    template: `
<app-request-history [requestHistoryList]="history"></app-request-history>

`,
    providers: [DatePipe, ToTitlePipe],
    imports: [RequestHistoryComponent]
})
export class TestHistoryDetailsComponent {
  history: History[] = [
    {
        "created": "2022-11-12T14:00:11Z",
        "status": "SUBMITTED"
    },
    {
        "created": "2022-11-15T13:02:22Z",
        "status": "APPROVED_BY_MANAGER" 
    }
];

datePip = inject(DatePipe);
titlePipe = inject(ToTitlePipe);
}

describe('RequestHistoryComponent', () => {
  let component: TestHistoryDetailsComponent;
  let fixture: ComponentFixture<TestHistoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHistoryDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has correct input value', () => {
    const historyComponent = fixture.debugElement.query(By.directive(RequestHistoryComponent));

    expect(historyComponent.componentInstance.requestHistoryList).toEqual(component.history);
  });

  it('should loop over history array', () => {
    const historyList = fixture.nativeElement.querySelectorAll('[data-testid="status-container"]')  as NodeListOf<HTMLElement>;

    expect(historyList.length).toEqual(component.history.length);
  });

  it('should render status icons', () => {
    const icons = fixture.nativeElement.querySelectorAll('[data-testid="status-icon"]')  as NodeListOf<HTMLElement>;

    expect(icons.length).toEqual(component.history.length);
  });

  it('should render status date', () => {
    const dates = fixture.nativeElement.querySelectorAll('[data-testid="status-date"]');

    expect(dates.length).toEqual(component.history.length);
  });

  it('should render status date with format', () => {
    const historyComponent = fixture.debugElement.query(By.directive(RequestHistoryComponent));

    const dates = historyComponent.queryAll(By.css('app-information-row[data-testid="status-date"]'));

    expect(dates[0].componentInstance.value).toEqual(component.datePip.transform(component.history[0].created, 'dd-MM-yyyy - HH:mm'));
    expect(dates[1].componentInstance.value).toEqual(component.datePip.transform(component.history[1].created, 'dd-MM-yyyy - HH:mm'));
  });

  it('should render status defination', () => {
    const statuses = fixture.nativeElement.querySelectorAll('[data-testid="status-def"]');

    expect(statuses.length).toEqual(component.history.length);
  });

  it('should render status defination with string format', () => {
    const historyComponent = fixture.debugElement.query(By.directive(RequestHistoryComponent));

    const defs = historyComponent.queryAll(By.css('app-information-row[data-testid="status-def"]'));

    expect(defs[0].componentInstance.value).toEqual(component.titlePipe.transform(component.history[0].status));
    expect(defs[1].componentInstance.value).toEqual(component.titlePipe.transform(component.history[1].status));
  });
});
