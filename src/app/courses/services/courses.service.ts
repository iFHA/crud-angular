import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, first, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly API = 'http://localhost:8080/api/courses';
  constructor(private httpClient: HttpClient) { }
  list(): Observable<Array<Course>> {
    return this.httpClient.get<Array<Course>>(this.API)
    .pipe(
      first()
    );
  }
  save(course: Course): Observable<Course> {
    if (course._id.length>0) {
      return this.httpClient.put<Course>(`${this.API}/${course._id}`, course);
    }
    return this.httpClient.post<Course>(this.API, course);
  }
  getById(courseId:string): Observable<Course> {
    return this.httpClient.get<Course>(`${this.API}/${courseId}`);
  }
  delete(courseId:string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API}/${courseId}`);
  }
}
