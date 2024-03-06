import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSummaryComponent } from './request-summary.component';
import { Component, inject } from '@angular/core';
import { RequestType } from '@domain/request/models/request';
import { By } from '@angular/platform-browser';
import { ToTitlePipe } from '@shared/pipes/to-title.pipe';

@Component({
    selector: 'app-test-summary',
    standalone: true,
    template: `
 <app-request-summary [requestType]="type"></app-request-summary>

`,
    imports: [RequestSummaryComponent],
    providers: [ToTitlePipe]
})
export class TestSummaryComponent {
type: RequestType = 'INTERNAL_MOBILITY';
titlePip = inject(ToTitlePipe);
}

describe('RequestSummaryComponent', () => {
  let component: TestSummaryComponent;
  let fixture: ComponentFixture<TestSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render the request type as a title', () => {
    const summaryComponent = fixture.debugElement.query(By.directive(RequestSummaryComponent));
    const title = fixture.nativeElement.querySelector('[data-testid="request-type-title"]');

    expect(summaryComponent.componentInstance.requestType).toEqual(component.type);
    expect(title.textContent).toEqual(component.titlePip.transform(component.type));
  });
});
