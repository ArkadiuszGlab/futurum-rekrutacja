import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiSelectComponent } from './multi-select.component';
import { By } from '@angular/platform-browser';

describe('MultiSelectComponent', () => {
  let component: MultiSelectComponent;
  let fixture: ComponentFixture<MultiSelectComponent>;

  const fakeOptions = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dropdown when clicked', () => {
    expect(component.isOpen).toBeFalse();

    const selectBox = fixture.debugElement.query(By.css('.select-box'));
    selectBox.triggerEventHandler('click', null);

    fixture.detectChanges();
    expect(component.isOpen).toBeTrue();

    selectBox.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isOpen).toBeFalse();
  });

  it('should select and deselect an option', () => {
    component.options = fakeOptions;
    component.selectedOptions = [];

    component.toggleOption('1');
    expect(component.selectedOptions).toEqual(['1']);

    component.toggleOption('1');
    expect(component.selectedOptions).toEqual([]);
  });

  it('should select all options when "Select All" is clicked', () => {
    component.options = fakeOptions;
    component.selectedOptions = [];

    component.toggleSelectAll();
    expect(component.selectedOptions).toEqual(['1', '2', '3']);

    component.toggleSelectAll();
    expect(component.selectedOptions).toEqual([]);
  });

  it('should emit selectedOptionsChange when an option is toggled', () => {
    const selectedOptionsChangeSpy = spyOn(
      component.selectedOptionsChange,
      'emit'
    );

    component.options = fakeOptions;
    component.selectedOptions = [];

    component.toggleOption('1');
    expect(selectedOptionsChangeSpy).toHaveBeenCalledWith(['1']);
  });

  it('should display selected options', () => {
    component.options = fakeOptions;
    component.selectedOptions = ['1', '2'];

    fixture.detectChanges();

    const selectedOptionsText = fixture.debugElement.query(
      By.css('.selected-options')
    ).nativeElement.textContent;
    expect(selectedOptionsText).toContain('Option 1');
    expect(selectedOptionsText).toContain('Option 2');
  });
});
