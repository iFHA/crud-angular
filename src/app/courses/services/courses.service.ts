import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly API = "/src/assets/courses.json";
  constructor(private httpClient:HttpClient) { }
  list ():Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.API).pipe(
      first()// estou interessado apenas na primeira resposta que o servidor nos dá,
      //já que o mesmo não retorna um stream
    );
  }
}
