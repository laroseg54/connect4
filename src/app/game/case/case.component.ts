import { Component, Input, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { CaseData } from 'src/DataTypes/case-data';


@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit {

  constructor(private playerService : PlayerService) { 
  }

  @Input() data : CaseData;
 


  ngOnInit(): void {
  }

  poserPion(){
    this.playerService.placerPion(this.data);
  }

}
