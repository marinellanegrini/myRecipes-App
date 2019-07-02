import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentaPage } from './commenta.page';

describe('CommentaPage', () => {
  let component: CommentaPage;
  let fixture: ComponentFixture<CommentaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
