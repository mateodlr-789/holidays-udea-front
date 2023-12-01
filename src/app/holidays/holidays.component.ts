import { Component } from '@angular/core';
import { HolidaysService } from './services/holidays.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})

export class HolidaysComponent {
  public isHoliday: string = ''
  selectedYear: number | null = null;
  years: number[] = [];
  holidays: string[] = [];

  constructor(private holidayService: HolidaysService){
    const currentYear = new Date().getFullYear();
    for (let year = 1990; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  public getIsHoliday(date: string){
    this.holidayService.getIsHoliday(date).subscribe(
      data => {
        const newData: any = data
        this.isHoliday=newData.status
      },
      error => {
        console.error('Error en la petición :c', error);
      }
    )
  }

  public listHoliday(year: string){
    this.holidayService.listHoliday(year).subscribe(
      data => {
        const newData: any = data
        this.holidays=newData
      },
      error => {
        console.error('Error en la petición :c', error);
      }
    )
  }

  onYearSelectionChange(): void {
    this.listHoliday(String(this.selectedYear))
    console.log('Año seleccionado:', this.selectedYear);
  }

  onDateChange(event: MatDatepickerInputEvent<Date | null>): void {
    const nuevaFecha: Date | null = event.value;
    if (nuevaFecha) {
      const ano: number = nuevaFecha.getFullYear();
      const mes: number = nuevaFecha.getMonth() + 1; // Los meses en JavaScript son 0-indexados, por lo que sumamos 1
      const dia: number = nuevaFecha.getDate();
      const fechaFormateada: string = `${ano}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
      console.log('La fecha ha cambiado:', fechaFormateada);
      this.getIsHoliday(fechaFormateada)
    }
  }
  
}
