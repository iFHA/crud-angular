import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, first, of } from 'rxjs';
import { CoursePage } from '../model/course-page';

interface props {
  page: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly API = 'http://localhost:8080/api/courses';
  constructor(private httpClient: HttpClient) { }
  list(page:props = {
    page: 0,
    pageSize: 5
  }): Observable<CoursePage> {
    return this.httpClient.get<CoursePage>(this.API, { params: {pageNumber: page.page, pageSize: page.pageSize}})
    .pipe(
      first()
    );
  }
  save(course: Course): Observable<Course> {
    if (course._id) {
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
