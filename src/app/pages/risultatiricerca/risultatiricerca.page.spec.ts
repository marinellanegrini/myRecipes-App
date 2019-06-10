import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RisultatiricercaPage } from './risultatiricerca.page';

describe('RisultatiricercaPage', () => {
  let component: RisultatiricercaPage;
  let fixture: ComponentFixture<RisultatiricercaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RisultatiricercaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RisultatiricercaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
