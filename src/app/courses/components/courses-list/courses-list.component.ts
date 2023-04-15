import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../model/course';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  readonly displayedColumns = ['_id', 'name', 'category', 'actions'];
  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  constructor(
  ) {}
  onAdd() {
    this.add.emit();
  }
}
