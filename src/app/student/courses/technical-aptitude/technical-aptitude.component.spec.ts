import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalAptitudeComponent } from './technical-aptitude.component';

describe('TechnicalAptitudeComponent', () => {
  let component: TechnicalAptitudeComponent;
  let fixture: ComponentFixture<TechnicalAptitudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicalAptitudeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TechnicalAptitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
