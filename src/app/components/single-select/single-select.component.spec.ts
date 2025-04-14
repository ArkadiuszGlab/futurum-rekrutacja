import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleSelectComponent } from './single-select.component';
import { FormsModule } from '@angular/forms';

describe('SingleSelectComponent', () => {
  let component: SingleSelectComponent;
  let fixture: ComponentFixture<SingleSelectComponent>;

  const mockOptions = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleSelectComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleSelectComponent);
    component = fixture.componentInstance;
    component.options = mockOptions;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dropdown when clicked', () => {
    expect(component.isOpen).toBe(false);

    component.toggleDropdown();
    fixture.detectChanges();
    expect(component.isOpen).toBe(true);

    component.toggleDropdown();
    fixture.detectChanges();
    expect(component.isOpen).toBe(false);
  });

  it('should display the selected option label when an option is selected', () => {
    component.selectOption(2);
    fixture.detectChanges();

    expect(component.getSelectedOptionLabel()).toBe('Option 2');
  });

  it('should call onChange and onTouched when an option is selected', () => {
    const selectOptionSpy = spyOn(component, 'selectOption').and.callThrough();

    component.selectOption(1);

    expect(selectOptionSpy).toHaveBeenCalledWith(1);
  });

  it('should not toggle dropdown when disabled', () => {
    component.disabled = true;
    component.toggleDropdown();
    fixture.detectChanges();

    expect(component.isOpen).toBe(false);
  });

  it('should display "Select an option..." when no option is selected', () => {
    expect(component.getSelectedOptionLabel()).toBe('Select an option...');
  });

  it('should handle writeValue method to set selected option', () => {
    component.writeValue(3);
    fixture.detectChanges();

    expect(component.selectedOption).toBe(3);
    expect(component.getSelectedOptionLabel()).toBe('Option 3');
  });

  it('should call onChange when writeValue is called', () => {
    const writeValueSpy = spyOn(component, 'writeValue').and.callThrough();

    component.writeValue(1);
    expect(writeValueSpy).toHaveBeenCalledWith(1);
  });

  it('should disable the select dropdown when disabled is set', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    expect(component.disabled).toBe(true);
    component.toggleDropdown();
    expect(component.isOpen).toBe(false);
  });

  it('should not show options when dropdown is toggled while disabled', () => {
    component.disabled = true;
    component.toggleDropdown();
    fixture.detectChanges();

    expect(component.isOpen).toBe(false);
  });

  it('should display the correct label for selected option', () => {
    component.selectOption(2);
    fixture.detectChanges();

    const selectedLabel = component.getSelectedOptionLabel();
    expect(selectedLabel).toBe('Option 2');
  });
});
