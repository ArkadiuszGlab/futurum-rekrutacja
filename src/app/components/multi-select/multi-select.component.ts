import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.css',
  imports: [CommonModule],
})
export class MultiSelectComponent {
  @Input() options: { label: string; value: any }[] = [];
  @Input() selectedOptions: any[] = [];
  @Output() selectedOptionsChange = new EventEmitter<any[]>();

  isOpen = false;

  get allSelected(): boolean {
    return (
      this.options.length > 0 &&
      this.selectedOptions.length === this.options.length
    );
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  isSelected(value: any): boolean {
    return this.selectedOptions.includes(value);
  }

  toggleOption(value: any): void {
    const index = this.selectedOptions.indexOf(value);
    if (index === -1) {
      this.selectedOptions = [...this.selectedOptions, value];
    } else {
      this.selectedOptions = this.selectedOptions.filter(
        (item) => item !== value
      );
    }
    this.selectedOptionsChange.emit(this.selectedOptions);
  }

  toggleSelectAll(): void {
    if (this.allSelected) {
      this.selectedOptions = [];
    } else {
      this.selectedOptions = this.options.map((option) => option.value);
    }
    this.selectedOptionsChange.emit(this.selectedOptions);
  }

  getSelectedLabels(): string {
    return this.selectedOptions
      .map((value) => {
        const option = this.options.find((opt) => opt.value === value);
        return option ? option.label : '';
      })
      .join(', ');
  }
}
