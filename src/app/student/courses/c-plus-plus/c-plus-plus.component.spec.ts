import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPlusPlusComponent } from './c-plus-plus.component';

describe('CPlusPlusComponent', () => {
  let component: CPlusPlusComponent;
  let fixture: ComponentFixture<CPlusPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CPlusPlusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CPlusPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
