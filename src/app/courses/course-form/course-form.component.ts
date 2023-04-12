import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
  form: FormGroup;
  public constructor(private formBuilder:FormBuilder, private cs:CoursesService, private snackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    })
  }
  onSubmit() {
    this.cs.save(this.form.value).subscribe({
      next: result => console.log(result),
      error: () => this.onError()
    });
  }
  onCancel() {}
  onError() {
    this.snackBar.open('Erro', '', { duration: 3000 });
  }
}
