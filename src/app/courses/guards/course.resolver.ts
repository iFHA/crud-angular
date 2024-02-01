import { ResolveFn } from '@angular/router';
import { Course } from '../model/course';
import { inject } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Observable, of } from 'rxjs';

export const courseResolver: ResolveFn<Observable<Course>> = (route, state) => {
  if(route.params && route.params['id']) {
    const courseId = route.params['id'];
    return inject(CoursesService).getById(courseId);
  }
  return of({_id:'', name: '', category: '', lessons:[]});
};
