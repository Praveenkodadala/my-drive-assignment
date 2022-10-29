import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsDashComponent } from './icons-dash.component';

describe('IconsDashComponent', () => {
  let component: IconsDashComponent;
  let fixture: ComponentFixture<IconsDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconsDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
