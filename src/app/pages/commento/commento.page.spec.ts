import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentoPage } from './commento.page';

describe('CommentoPage', () => {
  let component: CommentoPage;
  let fixture: ComponentFixture<CommentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
