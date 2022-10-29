import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydriveFolderViewComponent } from './mydrive-folder-view.component';

describe('MydriveFolderViewComponent', () => {
  let component: MydriveFolderViewComponent;
  let fixture: ComponentFixture<MydriveFolderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MydriveFolderViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MydriveFolderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
