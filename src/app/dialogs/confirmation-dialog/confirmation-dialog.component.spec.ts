import {ConfirmDialogComponent} from './confirmation-dialog.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';


const MatDialogRefMock = {
  close: () => null
};

describe(ConfirmDialogComponent.name, () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfirmDialogComponent
      ],
      providers: [
        // MatDialogRef,
        {
          provide: MatDialogRef, useValue: MatDialogRefMock
        },
        // MAT_DIALOG_DATA
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onConfirm send true value', () => {
    const spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.onConfirm();
    expect(spy).toHaveBeenCalled();
  });

  it('onConfirm send true value', () => {
    // const service = fixture.debugElement.injector.get(MatDialogRef);
    const service = TestBed.inject(MatDialogRef);
    const spy = spyOn(service, 'close');
    component.onConfirm();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should onDismiss send false value', () => {
    const spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.onDismiss();
    expect(spy).toHaveBeenCalled();
  });

  it('onDismiss send false value', () => {
    const service = TestBed.inject(MatDialogRef);
    const spy = spyOn(service, 'close');
    component.onDismiss();
    expect(spy).toHaveBeenCalledWith(false);
  });

});





