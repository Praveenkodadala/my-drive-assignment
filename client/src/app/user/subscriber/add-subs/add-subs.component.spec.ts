import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubsComponent } from './add-subs.component';

describe('AddSubsComponent', () => {
  let component: AddSubsComponent;
  let fixture: ComponentFixture<AddSubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
