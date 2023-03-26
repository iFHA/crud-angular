import { Component } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})


export class CoursesComponent {
  courses: Course[] = [
    {
      _id: "1",
      category: "Back-end",
      name: "SpringBoot"
    },
    {
      _id: "2",
      category: "Back-end",
      name: "SpringMvc"
    }
  ];
  displayedColumns = ['_id', 'category', 'name'];
  constructor() {
  }
}
