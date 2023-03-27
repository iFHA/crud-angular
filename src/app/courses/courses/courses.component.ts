import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})


export class CoursesComponent {
  courses$: Observable<Course[]>;
  displayedColumns = ['_id', 'category', 'name'];
  constructor(private cs:CoursesService) {
    this.courses$ = cs.list();
  }
}
