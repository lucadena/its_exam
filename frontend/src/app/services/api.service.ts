import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  host = null;

  constructor(private http: HttpClient) {
    this.host = environment.apiUrl;
  }

  getSections() {
    return this.http.get(`${this.host}/sections`);
  }

  getConveyors(sectionId) {
    return this.http.get(`${this.host}/conveyors/${sectionId}`);
  }

  getConveyorState(conveyorId) {
    return this.http.get(`${this.host}/conveyors/state/${conveyorId}`);
  }

  getAlerts() {
    return this.http.get(`${this.host}/alert`);
  }

  checkAlert(id) {
    // @ts-ignore
    return this.http.put(`${this.host}/alert/${id}/read`);
  }

}
