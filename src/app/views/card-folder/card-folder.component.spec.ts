import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFolderComponent } from './card-folder.component';

describe('CardFolderComponent', () => {
  let component: CardFolderComponent;
  let fixture: ComponentFixture<CardFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
