import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProyectComponent } from './delete-proyect.component';

describe('DeleteProyectComponent', () => {
  let component: DeleteProyectComponent;
  let fixture: ComponentFixture<DeleteProyectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteProyectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProyectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
