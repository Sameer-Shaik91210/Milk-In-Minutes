import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  @Output() selectedEmitter: EventEmitter<string> = new EventEmitter<string>();

  selectedValue: string = '';

  category = [
    { value: 'milk', viewValue: 'Milk' },
    { value: 'cheese', viewValue: 'Cheese' },
    { value: 'butter', viewValue: 'Butter' },
    { value: 'yogurt', viewValue: 'Yogurt' },
  ];

  // Emit selected value whenever it changes
  onSelectionChange() {
    this.selectedEmitter.emit(this.selectedValue);
  }
}
