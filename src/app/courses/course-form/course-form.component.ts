import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar
    ) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }
  onSubmit(){
    this.coursesService.save(this.form.value).subscribe({
      next: console.log,
      error: error => this.onError()
    });
  }
  onCancel(){
    this.router.navigate(['courses']);
  }
  onError() {
    this.openSnackBar("Erro ao salvar curso");
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration:3000});
  }
}
