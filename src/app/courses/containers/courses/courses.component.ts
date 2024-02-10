import { Component, ViewChild } from '@angular/core';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursePage } from '../../model/course-page';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';
@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardHeader, MatToolbar, MatCardContent, MatProgressSpinner, CoursesListComponent, MatPaginator, AsyncPipe]
})
export class CoursesComponent {
  courses$:Observable<CoursePage>|null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageIndex = 0;
  pageSize = 5;

  constructor(
    private readonly courseService:CoursesService,
    private readonly dialog:MatDialog,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly snackbar: MatSnackBar
    ) {
    this.carregaCursos();
  }
  carregaCursos(pageEvent: PageEvent = {
    length: 0,
    pageIndex: this.pageIndex,
    pageSize: this.pageSize
  }):void {
    this.courses$ = this.courseService.list({page: pageEvent.pageIndex, pageSize: pageEvent.pageSize})
    .pipe(
      tap(page=>{this.pageIndex=page.page; this.pageSize = page.size;}),
      catchError((error:HttpErrorResponse)=>{
        this.onError("Erro ao carregar cursos!");
        return of({courses: [], totalElements:0, totalPages:0, page:0, size:0});
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

  onEdit(id:string) {
    this.router.navigate(['edit', id], {relativeTo: this.route});
  }
  onDelete(course:Course) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        confirmationMessage: `Tem certeza que deseja excluir o curso ${course.name}?`
      },
    });
    dialogRef.afterClosed().subscribe(confirmation=>{
      if(confirmation) {
        this.deleteCourse(course._id).subscribe({
          next: () => {
            this.dialog.closeAll();
            this.snackbar.open(`Curso ${course.name} removido com sucesso!`, "X", {
              duration: 5000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            })
            this.carregaCursos();
          },
          error: () => {
            this.dialog.closeAll();
            this.onError(`Erro ao remover curso ${course.name}`)
          }
        });
      }
    })
  }
  deleteCourse(courseId:string): Observable<void> {
    return this.courseService.delete(courseId);
  }
}
