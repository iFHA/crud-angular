import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../model/course';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  readonly displayedColumns = ['_id', 'name', 'category', 'actions'];
  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);
  constructor(
    private dialog: MatDialog
  ) {}
  onAdd() {
    this.add.emit();
  }
  onEdit(course:Course) {
    this.edit.emit(course);
  }
  onDelete(id:string) {
    this.dialog.open(ConfirmationDialogComponent, {
      data: "Deseja Realmente Apagar o Curso?"
    })
    .afterClosed()
    .subscribe((result:boolean) => {
      if(result) {
        this.delete.emit(id);
      }
    })
  }
}
