import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VqDashComponent } from './vq-dash.component';

describe('VqDashComponent', () => {
  let component: VqDashComponent;
  let fixture: ComponentFixture<VqDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VqDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VqDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
