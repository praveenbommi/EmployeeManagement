import { Component, OnInit } from '@angular/core';
import { TestingzoneService } from '../testingzone.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

tabledata={}
listofdata=[]
errmsg:boolean
entered:boolean
count:number
em=''
  constructor(private _router:Router,private dataservice:TestingzoneService,private location:Location) { }

  ngOnInit() {
   
  }
 specificdata(){
   this.entered=true
   this.count=0
   this.dataservice.getdata(this.tabledata).subscribe(
     data => {console.log(data)
             this.listofdata=data
             for(let i=0;i<this.listofdata.length;i++){
               this.count=this.count+1
             }
             if(this.count == 0){
              this.errmsg = true
              this.em = "OOPS!! No Record Found"
            }
             console.log(this.count)
            //  this.count=0
            },
     err => console.log(err)
   )
 }

 search(){
  window.location.reload()
 }

 
}
