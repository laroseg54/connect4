import { Injectable } from '@angular/core';
import { CaseData } from 'src/DataTypes/case-data';
import { JeuInfos } from 'src/DataTypes/jeu-infos';
import { Observable, BehaviorSubject } from 'rxjs';
import { PlayersInfos } from 'src/DataTypes/players-infos';



@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  actualPlayer: string = "yellow";
  grille: CaseData[][] = [];
  private jeuxSubject = new BehaviorSubject<JeuInfos>({ gagnant: "", terminee: false,players:{ pseudo1: '',
  color1: '',
  pseudo2: '',
  color2: ''}});


  constructor() { }

  getJeuSubjectDataObservable(): Observable<JeuInfos> {
    return this.jeuxSubject.asObservable();
  }

  initializeTable(hauteur: number, taille: number) {
    for (let i = 0; i < hauteur; i++) {
      this.grille.push([]);
      for (let j = 0; j < taille; j++) {
        this.grille[i][j] = { colonne: j, couleur: "white" };

      }

    }
  }
  placerPion(data: CaseData) {

    let j: number = data.colonne;
    let i: number = this.grille.length - 1
    while (i >= 0 && this.grille[i][j].couleur !== "white") {
      i--;
    }
    if (i >= 0) {
      this.grille[i][j].couleur = this.actualPlayer;
      this.verifierGagnant(i, j, this.actualPlayer);
      this.changerJoueur();

    }


  }

  changerJoueur() {
    if (this.actualPlayer === "red") {
      this.actualPlayer = "yellow";
    }
    else {
      this.actualPlayer = "red";
    }
  }

  verifierGagnant(ligne: number, colonne: number, couleur: string) {

    let alignement: number = 0;
    let i: number = ligne;
    if (ligne < 3) {
      while (i < this.grille.length && this.grille[i][colonne].couleur === couleur) {
        i++;
        alignement++;
      }
      console.log(alignement);
      if (alignement === 4) {
        this.setGagnant(couleur);
      }
    }

  }

  setGagnant(couleur: string) {

    const inf = this.jeuxSubject.getValue();
    console.log(inf.players);
    if(inf.players.color1===couleur){
      this.jeuxSubject.next({ gagnant: inf.players.pseudo1, terminee: true,players:inf.players});
    }
    else{
      this.jeuxSubject.next({ gagnant: inf.players.pseudo2, terminee: true,players:inf.players});
    }
    

  }

  getPlayers() {

  }
}
