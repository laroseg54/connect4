import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { CaseData } from 'src/DataTypes/case-data';
import { JeuInfos } from 'src/DataTypes/jeu-infos';



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
  public infos : JeuInfos;


  @Input('parentData') public name:string; 
  @Output() public childEvent = new EventEmitter(); 

  constructor(private playerService : PlayerService) {
    playerService.getJeuSubjectDataObservable().subscribe(infos => this.infos = infos );
    playerService.initializeTable(this.hauteur,this.taille);
   }

  get grille() : CaseData[][]{
    return this.playerService.grille;
  }
  ngOnInit(): void {
    console.log("parentData vaut " + this.name);
  ;
  }

 
  /*
  fireEvent() {
    this.childEvent.emit('Hey Codevolution');
  }
  */

}
