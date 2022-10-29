import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonMydriveHeadComponent } from './common-mydrive-head.component';

describe('CommonMydriveHeadComponent', () => {
  let component: CommonMydriveHeadComponent;
  let fixture: ComponentFixture<CommonMydriveHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonMydriveHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonMydriveHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
