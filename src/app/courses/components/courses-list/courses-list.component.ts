import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
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
