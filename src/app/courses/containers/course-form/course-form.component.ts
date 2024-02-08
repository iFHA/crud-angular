import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';
import { FormUtilsService } from '../../../shared/form/form-utils.service';

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
    private activatedRoute: ActivatedRoute,
    public formUtils: FormUtilsService
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
      this.formUtils.validateAllFormFields(this.form);
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
  private createLesson(lesson:Lesson = {_id: '', name: '', youtubeUrl: ''}) {
    return this.formBuilder.group({
      _id: [lesson._id],
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
}
