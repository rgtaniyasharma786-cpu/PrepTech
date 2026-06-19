import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbmsComponent } from './dbms.component';

describe('DbmsComponent', () => {
  let component: DbmsComponent;
  let fixture: ComponentFixture<DbmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DbmsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DbmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
