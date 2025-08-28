import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrySelectionComponent } from './industry-selection.component';

describe('IndustrySelectionComponent', () => {
  let component: IndustrySelectionComponent;
  let fixture: ComponentFixture<IndustrySelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndustrySelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndustrySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
