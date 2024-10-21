import { NotesComponent } from './notes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../auth.guard';


const routes: Routes = [{ path: '', component: NotesComponent, canActivate: [AuthGuard] }];

@NgModule({
  declarations: [NotesComponent],
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),  // Lazy loaded route
  ],
})
export class NotesModule {}
