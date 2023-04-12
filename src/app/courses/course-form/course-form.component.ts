import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
  form: FormGroup;
  public constructor(private formBuilder:FormBuilder, private cs:CoursesService) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    })
  }
  onSubmit() { this.cs.save(this.form.value).subscribe(result=>console.log(result)) }
  onCancel() {}
}
