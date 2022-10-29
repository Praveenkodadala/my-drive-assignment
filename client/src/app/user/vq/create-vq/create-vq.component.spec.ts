import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVqComponent } from './create-vq.component';

describe('CreateVqComponent', () => {
  let component: CreateVqComponent;
  let fixture: ComponentFixture<CreateVqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateVqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
