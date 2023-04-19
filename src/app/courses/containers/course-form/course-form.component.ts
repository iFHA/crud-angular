import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    category: ['', [Validators.required]]
  });
  public constructor(
      private formBuilder:NonNullableFormBuilder,
      private cs:CoursesService,
      private snackBar: MatSnackBar,
      private location: Location,
      private route: ActivatedRoute
    ) {
      const {_id, category, name} = route.snapshot.data['course'];
      this.form.setValue({
        _id,
        category,
        name
      });
  }

  onSubmit() {
      this.cs.save(this.form.value).subscribe({
        next: result => {
          this.toast(`Curso ${result._id} - ${result.name} ${ this.form.value._id ? "Alterado" : "cadastrado" } com sucesso!`);
          this.back();
        },
        error: (err) => this.onError(err)
      });
  }
  onCancel() {
    this.back();
  }
  onError({ statusText }:HttpErrorResponse) {
    this.toast(`Erro ${statusText}`);
  }
  back() {
    this.location.back();
  }
  toast(msg:string) {
    this.snackBar.open(msg, '', { duration: 5000 });
  }
  isUpdateMode():boolean {
    return this.form.value._id ? true : false;
  }
  getErrorMessage(field:"name" | "category"):string {
    const campo = field === "name" ? "Nome" : "Categoria";
    if (this.form.get(field)?.hasError('required')) {
      return `Campo ${ campo } é obrigatório`;
    }
    if (this.form.get(field)?.hasError('minlength')) {
      return `Devem ser informados pelo menos ${ this.form.get(field)?.getError('minlength').requiredLength } caracteres para o campo ${ campo }`;
    }
    if (this.form.get(field)?.hasError('maxlength')) {
      return `Devem ser informados no máximo ${ this.form.get(field)?.getError('maxlength').requiredLength } caracteres para o campo ${ campo }`;
    }
    return 'Campo Inválido';
  }
}
