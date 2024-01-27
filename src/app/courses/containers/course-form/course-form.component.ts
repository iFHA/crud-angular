import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {
  form: FormGroup = this.formBuilder.group({
    _id: [''],
    name: [''],
    category: ['']
  });
  constructor(
    public formBuilder:NonNullableFormBuilder,
    private coursesService:CoursesService,
    private router:Router,
    private snackBar: MatSnackBar,
    private location: Location,
    private activatedRoute: ActivatedRoute
    ) {
    this.activatedRoute.data.subscribe(({course})=> {
      this.form.setValue({_id: course._id, name: course.name, category: course.category});
    })
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
