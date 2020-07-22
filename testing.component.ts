import { Component, OnInit } from '@angular/core';
import { TestingzoneService } from '../testingzone.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DelService } from '../del.service';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { saveAs } from 'file-saver'
import { FilesService } from '../files.service';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// import { Console } from 'console';

const uri = 'http://localhost:3000/upload';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {
  listofusers = []
  deleteuserone=''
  successmsg:boolean
  errormsg=''
  attachmentList:any = [];
  updatedmsg=''
  updatemany:boolean
  registeredUserdata={}
  username=''
  errm:boolean
  
  uploader:FileUploader = new FileUploader({url:uri});

  constructor(private getusersservice:TestingzoneService,
    private _router:Router,
    private authservice:AuthService,
    private delservice:DelService,
    private fileservice:FilesService)
     {
      this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
        this.attachmentList.push(JSON.parse(response));
    }
     }

  ngOnInit() {
  }
  getall(){
    this.getusersservice.getUsers().subscribe(
      data =>{ this.listofusers = data,
        this.updatemany=true,
      this.successmsg=false}
     ,
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this._router.navigate(['/login'])
          }
        }
      }
    )
  }
  deleteuser(p,user){
    // var y= user.split("@")
    this.deleteuserone=user
    console.log(this.deleteuserone)
    this.delservice.removeUser(this.deleteuserone).subscribe(
      res=>{
           this.listofusers.splice(p,1)
          //  this.Successmsg=this.sm + y[0];
          },
      err => console.log(err)
    )
  }
 
  download(index){
    var filename = this.attachmentList[index].uploadname;

    this.fileservice.downloadFile(filename)
    .subscribe(
        data => saveAs(data, filename),
        error => console.error(error)
    );
}

downloadPDF(){
  const doc = new jsPDF();
  autoTable(doc,{
    html:'#dt',
    bodyStyles: {fontStyle:'bold',textColor:'blue',fillColor:'lightblue'}
    })
  doc.save("Infosyians.pdf");
}

beforeupdate(username){
  this.updatemany=true
   this.username=username
   this.successmsg=true
}

afterupdate(){
  this.updatemany=false
  this.errm=false
  this.getusersservice.updateUser(this.username,this.registeredUserdata).subscribe(
    data=>this.updatedmsg="Successfully updated Buddy",
   
    err => {this.errm=true
      this.errormsg="Oh no!! Username/Password/Employee_no Already exists"}
  )
}



}
