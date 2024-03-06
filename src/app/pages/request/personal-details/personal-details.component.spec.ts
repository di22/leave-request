import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDetailsComponent } from './personal-details.component';
import { Component, inject } from '@angular/core';
import { PersonDetails } from '@domain/request/models/request';
import { DatePipe } from '@angular/common';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'app-test-personal',
    standalone: true,
    template: `
 <app-personal-details [personalDetails]="personDetails"></app-personal-details>

`,
    providers: [DatePipe],
    imports: [PersonalDetailsComponent]
})
export class TestPersonalDetailsComponent {
personDetails: PersonDetails = {
  "fistName": "John",
  "lastName": "Doe",
  "birthDay": "1988-12-12",
  "position": "Software Engineer"
};
datePip = inject(DatePipe);
}


describe('PersonalDetailsComponent', () => {
  let component: TestPersonalDetailsComponent;
  let fixture: ComponentFixture<TestPersonalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPersonalDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestPersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has correct input value', () => {
    const personalComponent = fixture.debugElement.query(By.directive(PersonalDetailsComponent));

    expect(personalComponent.componentInstance.personalDetails).toEqual(component.personDetails);
  });

  it('should render the person name', () => {
    const name = fixture.nativeElement.querySelector('[data-testid="person-name"]');

    expect(name.textContent).toEqual(component.personDetails.fistName + ' ' + component.personDetails.lastName);
  });

  it('should render the person position', () => {
    const position = fixture.nativeElement.querySelector('[data-testid="position"]');

    expect(position.textContent).toEqual(component.personDetails.position);
  });

  it('should render the person birthday with format', () => {
    const birthday = fixture.nativeElement.querySelector('[data-testid="birthday"]');

    expect(birthday.textContent).toEqual(component.datePip.transform(component.personDetails.birthDay, 'dd-MM-yyyy'));
  });
});
