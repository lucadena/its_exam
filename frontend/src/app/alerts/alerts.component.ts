import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";
import {SocketService} from "../services/socket.service";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  alerts: any[];
  private socket: any;
  constructor( private API: ApiService,  private socketService: SocketService) {
    this.downloadAlerts();

    this.socket = this.socketService.connect({});
    this.socket.on(`alert`, (res, err)=>{
      if(res){
        res = JSON.parse(res);
        this.alerts.push(res)
        console.log(res)
      } else {
        console.log(err)

      }
    })

  }

  downloadAlerts(){
    this.API.getAlerts().subscribe(
      (data) => {
        console.log(data);
        // @ts-ignore
        this.alerts = data;
      },
      (error) => {
        console.error(error)
      }
    )
  }

  ngOnInit() {
  }

  readAlert(id){
    this.API.checkAlert(id).subscribe(
      (data) => {
        this.downloadAlerts();
      },
      (error) => {
        console.error(error)
      }
    )
  }

}
