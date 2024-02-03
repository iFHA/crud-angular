import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {
  form: FormGroup;
  constructor(
    public formBuilder:NonNullableFormBuilder,
    private coursesService:CoursesService,
    private router:Router,
    private snackBar: MatSnackBar,
    private location: Location,
    private activatedRoute: ActivatedRoute
    ) {
    const course:Course = this.activatedRoute.snapshot.data['course'];
    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [Validators.required, Validators.minLength(5),Validators.maxLength(100)]],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(this.retrieveLessons(course), Validators.required)
    });
    // (({course})=> {
    //   this.form.setValue({_id: course._id, name: course.name, category: course.category});
    // })
  }
  onSubmit(){
    if (!this.form.valid) {
      return;
    }
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
  private createLesson(lesson:Lesson = {_id: '', name: '', youtubeUrl: ''}) {
    return this.formBuilder.group({
      id: [lesson._id],
      name: [lesson.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      youtubeUrl: [lesson.youtubeUrl, [Validators.required, Validators.minLength(10), Validators.maxLength(11)]]
    });
  }
  private retrieveLessons(course: Course){
    if(course?.lessons) {
      return course.lessons.map(lesson => this.createLesson(lesson));
    }
    return [this.createLesson()];
  }
  getLessonsFormArray(){
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }
  addNewLesson() {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }
  removeLesson(index: number) {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }
  isFormArrayRequired():boolean {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    return !lessons.valid && lessons.hasError('required') && lessons.touched;
  }
}
