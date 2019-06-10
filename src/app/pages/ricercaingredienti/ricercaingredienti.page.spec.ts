import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RicercaingredientiPage } from './ricercaingredienti.page';

describe('RicercaingredientiPage', () => {
  let component: RicercaingredientiPage;
  let fixture: ComponentFixture<RicercaingredientiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RicercaingredientiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RicercaingredientiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
