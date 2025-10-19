import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerReportComponent } from './employer-report.component';

describe('EmployerReportComponent', () => {
  let component: EmployerReportComponent;
  let fixture: ComponentFixture<EmployerReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
