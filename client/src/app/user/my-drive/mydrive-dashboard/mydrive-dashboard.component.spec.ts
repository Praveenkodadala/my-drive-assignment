import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydriveDashboardComponent } from './mydrive-dashboard.component';

describe('MydriveDashboardComponent', () => {
  let component: MydriveDashboardComponent;
  let fixture: ComponentFixture<MydriveDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MydriveDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MydriveDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
