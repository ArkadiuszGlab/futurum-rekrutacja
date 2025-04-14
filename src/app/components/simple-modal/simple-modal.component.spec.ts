import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleModalComponent } from './simple-modal.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { EventEmitter } from '@angular/core';

describe('SimpleModalComponent', () => {
  let component: SimpleModalComponent;
  let fixture: ComponentFixture<SimpleModalComponent>;
  let closeModalSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleModalComponent);
    component = fixture.componentInstance;

    closeModalSpy = spyOn(component.closeModal, 'emit');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the modal title', () => {
    component.title = 'Test Modal Title';
    fixture.detectChanges();

    const titleElement: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement.textContent).toBe('Test Modal Title');
  });

  it('should call close() when close button is clicked', () => {
    const closeButton: DebugElement = fixture.debugElement.query(
      By.css('.close-btn')
    );
    closeButton.triggerEventHandler('click', null);

    expect(closeModalSpy).toHaveBeenCalled();
  });

  it('should emit closeModal when close button is clicked', () => {
    const closeButton: DebugElement = fixture.debugElement.query(
      By.css('.close-btn')
    );
    closeButton.triggerEventHandler('click', null);

    expect(closeModalSpy).toHaveBeenCalledTimes(1);
  });

  it('should not close the modal when the content is clicked', () => {
    const modalContent: DebugElement = fixture.debugElement.query(
      By.css('.modal-content')
    );
    modalContent.triggerEventHandler('click', null);

    expect(closeModalSpy).toHaveBeenCalledTimes(0);
  });

  it('should emit closeModal when the background is clicked', () => {
    const modalBackdrop: DebugElement = fixture.debugElement.query(
      By.css('.modal-backdrop')
    );
    modalBackdrop.triggerEventHandler('click', null);

    expect(closeModalSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit closeModal when close() is called', () => {
    component.close();
    expect(closeModalSpy).toHaveBeenCalled();
  });
});
