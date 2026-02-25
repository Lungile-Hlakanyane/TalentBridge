import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInterviewsComponent } from './employee-interviews.component';

describe('EmployeeInterviewsComponent', () => {
  let component: EmployeeInterviewsComponent;
  let fixture: ComponentFixture<EmployeeInterviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeInterviewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
