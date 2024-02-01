import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
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
    name: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(100)]],
    category: ['', [Validators.required]],
    lessons: [[]]
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
      console.log(course);
      this.form.setValue({_id: course._id, name: course.name, category: course.category, lessons: course.lessons});
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
  getErrorMessage(fieldname: string) {
    const field = this.form.get(fieldname);
    if(fieldname === 'name') {
      if (field?.hasError('required')) {
        return 'Campo obrigatório';
      }
      if (field?.hasError('minlength')) {
        const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
        return `Tamanho mínimo para o campo é de ${requiredLength} caracteres`;
      }
      if (field?.hasError('maxlength')) {
        const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
        return `Tamanho máximo para o campo é de ${requiredLength} caracteres`;
      }
    }
    if(fieldname === 'category') {
      if (field?.hasError('required')) {
        return 'Campo obrigatório';
      }
    }
    return 'Campo inválido';
  }
}
