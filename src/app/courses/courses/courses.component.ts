import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { CategoryPipe } from '../../shared/pipes/category.pipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})


export class CoursesComponent {
  courses$: Observable<Course[]>;

  constructor(
    private cs:CoursesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
    ) {
    this.courses$ = cs.list().pipe(
      catchError(error => {
        this.onError("Erro ao carregar cursos");
        return of([]);
      })
    );
  }
  onError(msg:string) {
    this.dialog.open(ErrorDialogComponent, {
      data: msg
    });
  }
  onAdd() {
    this.router.navigate(['new'], { relativeTo:this.activatedRoute });
  }
}
