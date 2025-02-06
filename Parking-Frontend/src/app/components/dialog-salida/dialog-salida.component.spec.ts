import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSalidaComponent } from './dialog-salida.component';

describe('DialogSalidaComponent', () => {
  let component: DialogSalidaComponent;
  let fixture: ComponentFixture<DialogSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSalidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
