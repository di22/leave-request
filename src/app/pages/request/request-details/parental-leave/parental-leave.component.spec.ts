import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentalLeaveComponent } from './parental-leave.component';

describe('ParentalLeaveComponent', () => {
  let component: ParentalLeaveComponent;
  let fixture: ComponentFixture<ParentalLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentalLeaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParentalLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
