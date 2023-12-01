import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidaysComponent } from './holidays.component';
import { SharedModule } from '../shared/shared.module';
import { HolidaysRoutingModule } from './holidays-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HolidaysComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HolidaysRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class HolidaysModule { }
