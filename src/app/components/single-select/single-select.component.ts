import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-single-select',
  styleUrl: './single-select.component.css',
  imports: [CommonModule],
  templateUrl: './single-select.component.html',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SingleSelectComponent),
      multi: true,
    },
  ],
})
export class SingleSelectComponent implements ControlValueAccessor {
  @Input() options: { label: string; value: any }[] = [];

  selectedOption: any = null;
  isOpen = false;
  disabled = false;

  private onChange: any = () => {};
  private onTouched: any = () => {};

  writeValue(value: any): void {
    this.selectedOption = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggleDropdown(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.onTouched();
      }
    }
  }

  selectOption(value: any): void {
    this.selectedOption = value;
    this.onChange(value);
    this.onTouched();
    this.isOpen = false;
  }

  getSelectedOptionLabel(): string {
    const option = this.options.find(
      (opt) => opt.value === this.selectedOption
    );
    return option ? option.label : 'Select an option...';
  }
}
