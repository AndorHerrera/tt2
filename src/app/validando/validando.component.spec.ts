import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidandoComponent } from './validando.component';

describe('ValidandoComponent', () => {
  let component: ValidandoComponent;
  let fixture: ComponentFixture<ValidandoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidandoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
