import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalMobilityComponent } from './internal-mobility.component';

describe('InternalMobilityComponent', () => {
  let component: InternalMobilityComponent;
  let fixture: ComponentFixture<InternalMobilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalMobilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InternalMobilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
