import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../services/api.service";
import {SocketService} from "../services/socket.service";

@Component({
  selector: 'app-conveyor',
  templateUrl: './conveyor.component.html',
  styleUrls: ['./conveyor.component.css']
})
export class ConveyorComponent implements OnInit {

  conveyorId = null;
  status = null;
  socket = null;
  sectionId: any;


  constructor(private route: ActivatedRoute, private API: ApiService,  private socketService: SocketService) {
    // @ts-ignore
    this.conveyorId = this.route.params.value.id;
    // @ts-ignore
    this.sectionId = this.route.params.value.sectionId;
    this.socket = this.socketService.connect({});
    this.socket.on(`conveyor-${this.conveyorId}`, (res, err)=>{
      if(res){
        res = JSON.parse(res)
        console.log(res)
        if(res.type === 'consumption'){
          console.log("qui: ", res.data)
          this.status.consumption = res.data.data.value;
          this.status.consumption_date = res.data.data.timestamp;
        }

        if(res.type === 'speed'){
          this.status.speed = res.data.data.value;
          this.status.speed_date = res.data.data.timestamp;
        }
      }
      console.log(err)
    });

    this.API.getConveyorState(this.conveyorId).subscribe(
      (data) => {
        console.log(data);
        // @ts-ignore
        this.status = data;
      },
      (error) => {
        console.error(error)
      }
    )
  }

  ngOnInit(): void {
  }

}
