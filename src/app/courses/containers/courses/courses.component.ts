import { Component } from '@angular/core';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { Observable, catchError, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses$:Observable<Array<Course>>;

  constructor(
    private readonly courseService:CoursesService,
    private readonly dialog:MatDialog,
    private readonly router: Router,
    private readonly route: ActivatedRoute
    ) {
    this.courses$ = this.courseService.list()
    .pipe(
      catchError((error:HttpErrorResponse)=>{
        this.onError("Erro ao carregar cursos!");
        return of([]);
      })
    );
  }

  onError(errorMsg:string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
