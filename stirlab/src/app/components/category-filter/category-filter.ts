import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-category-filter',
  styleUrl: './category-filter.css',
  templateUrl: './category-filter.html',
})
export class CategoryFilter {
  categories = input.required<string[]>();
  selectedCategory = input.required<string>();

  categorySelected = output<string>();
}
