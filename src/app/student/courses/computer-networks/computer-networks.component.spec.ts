import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerNetworksComponent } from './computer-networks.component';

describe('ComputerNetworksComponent', () => {
  let component: ComputerNetworksComponent;
  let fixture: ComponentFixture<ComputerNetworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputerNetworksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComputerNetworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
