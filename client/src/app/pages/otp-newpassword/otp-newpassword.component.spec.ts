import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpNewpasswordComponent } from './otp-newpassword.component';

describe('OtpNewpasswordComponent', () => {
  let component: OtpNewpasswordComponent;
  let fixture: ComponentFixture<OtpNewpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpNewpasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpNewpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
