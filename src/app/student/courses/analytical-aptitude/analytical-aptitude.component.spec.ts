import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticalAptitudeComponent } from './analytical-aptitude.component';

describe('AnalyticalAptitudeComponent', () => {
  let component: AnalyticalAptitudeComponent;
  let fixture: ComponentFixture<AnalyticalAptitudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticalAptitudeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalyticalAptitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
