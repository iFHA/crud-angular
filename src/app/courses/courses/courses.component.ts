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
  courses$:Observable<Array<Course>>;
  // courses: Array<Course>;

  constructor(private readonly courseService:CoursesService) {
    this.courses$ = this.courseService.list();
  }

  public displayedColumns: Array<keyof Course> = [
    'name',
    'category'
  ];
}
