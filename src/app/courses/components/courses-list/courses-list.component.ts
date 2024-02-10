import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../model/course';
import { CategoryPipe } from '../../../shared/pipes/category.pipe';
import { MatMiniFabButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

@Component({
    selector: 'app-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrl: './courses-list.component.scss',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIcon, MatMiniFabButton, MatIconButton, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, CategoryPipe]
})
export class CoursesListComponent {
  @Output()
  add: EventEmitter<void> = new EventEmitter(false);

  @Output()
  edit: EventEmitter<string> = new EventEmitter(false);

  @Output()
  delete: EventEmitter<Course> = new EventEmitter(false);

  @Input()
  courses: Array<Course> = [];
  readonly displayedColumns: Array<string> = [
    'name',
    'category',
    'actions'
  ];
  onAdd() {
    this.add.emit();
  }
  onEdit(id: string) {
    this.edit.emit(id);
  }
  onDelete(course: Course) {
    this.delete.emit(course);
  }
}
