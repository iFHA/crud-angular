import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {
  form: FormGroup;
  constructor(
    public formBuilder:FormBuilder,
    private coursesService:CoursesService,
    private router:Router,
    private snackBar: MatSnackBar,
    private location: Location
    ) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }
  onSubmit(){
    this.coursesService.save(this.form.value).subscribe({
      next: course => this.onSuccess(),
      error: error => this.onError()
    });
  }
  onCancel(){
    this.router.navigate(['courses']);
  }
  private onSuccess() {
    this.openSnackBar("Curso salvo com sucesso");
    this.back();
  }
  private onError() {
    this.openSnackBar("Erro ao salvar curso");
  }
  private openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration:3000});
  }
  private back() {
    this.location.back();
  }
}
