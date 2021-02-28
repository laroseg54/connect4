import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

//MatDialog
import { MatDialog } from '@angular/material/dialog'; 
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

  //MatDialog
  constructor(private fb : FormBuilder, public dialog: MatDialog) { }

  /*MatDialog 
  openDialog() {
    this.dialog.open(GridComponent);
  } */

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.playerForm = this.fb.group({
       pseudo1: '',
       color1: '',
       pseudo2: '',
       color2: ''
    });
  }

  submitForm() { 
   console.log(this.playerForm.value);  
  }

} 
