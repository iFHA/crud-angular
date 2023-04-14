import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly API = "api/courses";
  constructor(private httpClient:HttpClient) { }
  list ():Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.API).pipe(
      first()// estou interessado apenas na primeira resposta que o servidor nos dá,
              //já que o mesmo não retorna um stream
    );
  }
  save (course: Partial<Course>):Observable<Course> {
    return this.httpClient.post<Course>(this.API, course);
  }
}
