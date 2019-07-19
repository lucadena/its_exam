import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  sectionId = null;
  conveyors = [];
  constructor(private route: ActivatedRoute, private API: ApiService) {
    // @ts-ignore
    this.sectionId = this.route.params.value.id;
    this.API.getConveyors(this.sectionId).subscribe(
      (data) => {
        console.log(data);
        // @ts-ignore
        this.conveyors = data;
      },
      (error) => {
        console.error(error)
      }
    )
  }

  ngOnInit() {
  }

}
