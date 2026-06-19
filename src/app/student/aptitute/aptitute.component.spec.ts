import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AptituteComponent } from './aptitute.component';

describe('AptituteComponent', () => {
  let component: AptituteComponent;
  let fixture: ComponentFixture<AptituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AptituteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AptituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
