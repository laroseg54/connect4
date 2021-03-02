import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

//MatDialog
import { MatDialog } from '@angular/material/dialog'; 
import { PlayerService } from 'src/app/services/player.service';
import { JeuInfos } from 'src/DataTypes/jeu-infos';
import { PlayersInfos } from 'src/DataTypes/players-infos';
import { GridComponent } from '../grid/grid.component';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
/* export class PlayerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}  */

export class PlayerComponent implements OnInit {
  /*playerForm = new FormGroup({
    pseudo: new FormControl(),
    color: new FormControl() 
  }); */ 
  public playerForm: FormGroup; 

  //
  public name = "Sisi";
  public message = ""; 
  public infos : JeuInfos;
  //MatDialog
  constructor(private fb : FormBuilder, public dialog: MatDialog,playerService: PlayerService) {
       playerService.getJeuSubjectDataObservable().subscribe(infos => this.infos = infos );
   }

  /*MatDialog 
  openDialog() {
    this.dialog.open(GridComponent);
  } */

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.playerForm = this.fb.group(this.infos.players);
  }

  submitForm() { 
   console.log(this.playerForm.value);  
   this.infos.players = this.playerForm.value;
   
  }

} 
