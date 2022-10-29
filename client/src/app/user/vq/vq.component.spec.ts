import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VqComponent } from './vq.component';

describe('VqComponent', () => {
  let component: VqComponent;
  let fixture: ComponentFixture<VqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
