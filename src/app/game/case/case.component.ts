import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit {

  constructor() { 

    this.color = "white";
  }

  public color : "red"|"yellow"|"white";

  ngOnInit(): void {
  }

  poserPion(){

    this.color="red";
  }

}
