import { Component } from '@angular/core';
import { Course } from '../model/course';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses:Array<Course> = [
    {
      _id: '0',
      name: 'curso1',
      category: 'c'
    }
  ];
  public displayedColumns: Array<keyof Course> = [
    'name',
    'category'
  ];
}
