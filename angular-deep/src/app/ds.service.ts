import { Injectable } from '@angular/core';
declare var deepstream : any;

@Injectable()
export class DsService {

  private ds;
  public dsInstance;

  constructor() {
    this.ds = this.dsInstance = deepstream('localhost:6020');

  }

  login (credentials?, loginHandler?) { // {username: 'u4bi', password:'password'}
    this.ds.login(credentials, loginHandler);
    
  }

  getRecord(name) {
    return this.ds.record.getRecord(name);
  }

  getList(name){
    return this.ds.record.getList(name);
  }

}
