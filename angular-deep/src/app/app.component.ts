import { Component, OnInit } from '@angular/core';
import { DsService } from './ds.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  
  constructor(private ds: DsService){

    this.ds.login(null, this.loginHandler);
    
  }

  loginHandler(success, data) {
    console.log('로그인', success, data);

  }

  ngOnInit(){

  }

}
