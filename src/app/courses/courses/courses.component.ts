import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Observable, catchError, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses$:Observable<Array<Course>>;

  constructor(
    private readonly courseService:CoursesService,
    private readonly dialog:MatDialog
    ) {
    this.courses$ = this.courseService.list()
    .pipe(
      catchError((error:HttpErrorResponse)=>{
        this.onError("Erro ao carregar cursos!");
        return of([]);
      })
    );
  }

  displayedColumns: Array<keyof Course> = [
    'name',
    'category'
  ];

  onError(errorMsg:string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }
}
