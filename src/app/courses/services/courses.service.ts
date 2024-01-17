import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient) { }
  list(): Array<Course> {
    return [
      {
        _id: '0',
        name: 'curso1',
        category: 'c'
      },
      {
        _id: '1',
        name: 'curso2',
        category: 'c'
      },
      {
        _id: '2',
        name: 'curso3',
        category: 'c'
      }
    ];
  }
}
