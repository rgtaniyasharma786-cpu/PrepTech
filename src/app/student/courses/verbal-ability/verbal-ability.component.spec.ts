import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbalAbilityComponent } from './verbal-ability.component';

describe('VerbalAbilityComponent', () => {
  let component: VerbalAbilityComponent;
  let fixture: ComponentFixture<VerbalAbilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerbalAbilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerbalAbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
