import { NgModule } from '@angular/core';
import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { CommonModule } from '@angular/common';
import { CategoryPipe } from './pipes/category.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        AppMaterialModule,
        ErrorDialogComponent,
        CategoryPipe,
        ConfirmationDialogComponent
    ],
    exports: [
        AppMaterialModule,
        ErrorDialogComponent,
        CategoryPipe,
        ConfirmationDialogComponent
    ],
})
export class SharedModule { }
