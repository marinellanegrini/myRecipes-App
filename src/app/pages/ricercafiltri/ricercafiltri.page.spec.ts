import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RicercafiltriPage } from './ricercafiltri.page';

describe('RicercafiltriPage', () => {
  let component: RicercafiltriPage;
  let fixture: ComponentFixture<RicercafiltriPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RicercafiltriPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RicercafiltriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
