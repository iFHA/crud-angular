import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, first, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly API = '/assets/courses.json';
  constructor(private httpClient: HttpClient) { }
  list(): Observable<Array<Course>> {
    return this.httpClient.get<Array<Course>>(this.API)
    .pipe(
      first()
    );
  }
}
