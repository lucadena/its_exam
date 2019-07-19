import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  host = null;

  constructor() {
    this.host = environment.socketUrl;
  }

  connect(params){
    //params
    return io(this.host);
  }

}
