import { Component, OnInit } from '@angular/core';
import { DsService } from './ds.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  
  name : string;
  text : string;
  chats : any;
  chatArray : any = [];

  constructor(private ds: DsService){
    
  }

  loginHandler(success, data) {
    console.log('로그인', success, data);

  }

  ngOnInit(){
    this.name = window.prompt('이름 설정', '');
    this.ds.login(null, (success, data) => console.log(success, data));

    this.chats = this.ds.getList('chats');

    this.chats.on('entry-added', recordName =>{

      this.ds.getRecord(recordName).whenReady(record =>{

        record.subscribe((data) =>{
          if(data.name && data.text)this.chatArray.push(data);

        }, true);

      });

    });
  }

  addChat() {

    let recordName = 'chat/' + this.ds.dsInstance.getUid();

    let chatRecord = this.ds.getRecord(recordName);
    

    chatRecord.set({
      name: this.name,
      text: this.text
    });
    
    this.text = '';
    
    this.chats.addEntry(recordName);
  }

}
