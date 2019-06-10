import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioRicettaPage } from './dettaglio-ricetta.page';

describe('DettaglioRicettaPage', () => {
  let component: DettaglioRicettaPage;
  let fixture: ComponentFixture<DettaglioRicettaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DettaglioRicettaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DettaglioRicettaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
