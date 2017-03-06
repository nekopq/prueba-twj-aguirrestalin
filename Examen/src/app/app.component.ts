import { Component, OnInit} from "@angular/core";
import {Response, Http} from "@angular/http";
import {Form, NgForm} from "@angular/forms";
import {MasterURLService} from "./services/master-url.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(){
  }

  ngOnInit(){
  }
}
