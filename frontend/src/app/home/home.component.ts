import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  apiUrl = environment.apiUrl;
  sections = [];

  constructor(private API: ApiService) {

    this.API.getSections().subscribe(
      (data) => {
        console.log(data);
        // @ts-ignore
        this.sections = data;
      },
      (error) => {
        console.error(error)
      }
    )

  }

}
