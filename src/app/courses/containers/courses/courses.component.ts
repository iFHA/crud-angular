import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { CategoryPipe } from '../../../shared/pipes/category.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})


export class CoursesComponent {
  courses$: Observable<Course[]> | null = null;

  constructor(
    private cs:CoursesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
    ) {
    this.refresh();
  }
  onError(msg:string) {
    this.dialog.open(ErrorDialogComponent, {
      data: msg
    });
  }
  onAdd() {
    this.router.navigate(['new'], { relativeTo:this.activatedRoute });
  }
  onEdit(course:Course) {
    this.router.navigate(['edit', course._id], { relativeTo: this.activatedRoute });
  }
  onDelete(id:string) {
    // abrir dialog, se confirmar, acessa rota de delete
    this.cs.delete(id).subscribe({
      next: () => {
        this.snackBar.open(`Curso ${id} removido com sucesso`, 'X',
            { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' });
        this.refresh();
      },
      error: () => {
        this.onError(`Ocorreu um erro ao remover o curso ${id}`);
      }
    });
  }
  refresh() {
    this.courses$ = this.cs.list().pipe(
      catchError(error => {
        this.onError("Erro ao carregar cursos");
        return of([]);
      })
    );
  }
}
