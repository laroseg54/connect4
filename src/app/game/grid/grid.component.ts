import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CaseComponent } from '../case/case.component';
//import EventEmitter = require('events');

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  //template: ' <h2>{{"Hello " + parentData }}</h2>',
  
  
  
    

  styleUrls: ['./grid.component.scss']
})

export class GridComponent implements OnInit {


  public taille = 7;
  public hauteur = 6;
  public grille : String[][] = [];

  @Input('parentData') public name:string; 
  @Output() public childEvent = new EventEmitter(); 

  constructor() { }

  ngOnInit(): void {
    console.log("parentData vaut " + this.name);
    this.initializeTable();
  }

  initializeTable(this:GridComponent){
      for(let i=0;i<this.hauteur;i++){
        this.grille.push(new Array<String>(7))
        for(let j=0;j<this.taille;j++){
          this.grille[i][j] = "white";
      }
    }
  }

  /*
  fireEvent() {
    this.childEvent.emit('Hey Codevolution');
  }
  */

}
