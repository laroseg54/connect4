/* MODULES */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* COMPONENTS */ 
import { RulesComponent } from './rules/rules.component';
import { ChoiceComponent } from './choice/choice.component';
import { PlayerComponent } from './game/player/player.component';
import { GridComponent } from './game/grid/grid.component';

const routes: Routes = [
  { path : 'rules', component: RulesComponent },
  { path: 'choice', component: ChoiceComponent },
  { path: 'player', component: PlayerComponent },
  { path: 'grid', component: GridComponent }, 
  //{ path: 'yourTodoList', component: TodoListComponent },

  { path: '', redirectTo: '/choice', pathMatch: 'full' },
  { path: '**', redirectTo: '/choice', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
