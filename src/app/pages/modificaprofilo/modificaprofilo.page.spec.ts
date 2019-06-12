import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaprofiloPage } from './modificaprofilo.page';

describe('ModificaprofiloPage', () => {
  let component: ModificaprofiloPage;
  let fixture: ComponentFixture<ModificaprofiloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificaprofiloPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaprofiloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
