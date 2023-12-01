import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

  constructor(private http: HttpClient) {
   }

   public getIsHoliday(date: string) {
    return this.http.get(`http://localhost:8080/holidays/hasHoliday/${date}`, {
      headers:{
      }
    });
   } 
   public listHoliday(year: string) {
    return this.http.get(`http://localhost:8080/holidays/listforyear/${year}`, {
      headers:{
      }
    });
   } 

}
