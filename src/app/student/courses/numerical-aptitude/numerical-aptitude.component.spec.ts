import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericalAptitudeComponent } from './numerical-aptitude.component';

describe('NumericalAptitudeComponent', () => {
  let component: NumericalAptitudeComponent;
  let fixture: ComponentFixture<NumericalAptitudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumericalAptitudeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumericalAptitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
