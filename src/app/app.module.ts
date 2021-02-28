/* MODULES */ 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';


import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

  /* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
//import {MatTableModule} from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';

import { MatDialogModule } from '@angular/material/dialog'; 

/* COMPONENTS */ 
import { AppComponent } from './app.component';
import { RulesComponent } from './rules/rules.component';
import { ChoiceComponent } from './choice/choice.component';
import { PlayerComponent } from './game/player/player.component';
import { GridComponent } from './game/grid/grid.component';
import { CaseComponent } from './game/case/case.component';


@NgModule({
  declarations: [
    AppComponent,
    RulesComponent,
    ChoiceComponent,
    PlayerComponent,
    GridComponent,
    CaseComponent
  ],
  //MatDialog
  entryComponents: [GridComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSliderModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule, 
    FormsModule,
    MatDialogModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

