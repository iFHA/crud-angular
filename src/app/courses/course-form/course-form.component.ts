import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
  form = this.formBuilder.group({
    name: [''],
    category: ['']
  });
  public constructor(
      private formBuilder:NonNullableFormBuilder,
      private cs:CoursesService,
      private snackBar: MatSnackBar,
      private location: Location
    ) {
  }

  onSubmit() {
    this.cs.save(this.form.value).subscribe({
      next: result => { this.toast(`Curso ${result._id} - ${result.name} cadastrado com sucesso!`); this.back(); },
      error: () => this.onError()
    });
  }
  onCancel() {
    this.back();
  }
  onError() {
    this.toast('Erro');
  }
  back() {
    this.location.back();
  }
  toast(msg:string) {
    this.snackBar.open(msg, '', { duration: 5000 });
  }
}
