import { Injectable } from '@angular/core';
import { CaseData } from 'src/DataTypes/case-data';
import { JeuInfos } from 'src/DataTypes/jeu-infos';
import { Observable, BehaviorSubject } from 'rxjs';
import { PlayersInfos } from 'src/DataTypes/players-infos';




@Injectable({
  providedIn: 'root'
})
export class PlayerService {


  actualPlayer: string ;
  grille: CaseData[][] = [];
  private jeuxSubject = new BehaviorSubject<JeuInfos>({
    gagnant: "", terminee: false, players: {
      pseudo1: '',
      color1: '',
      pseudo2: '',
      color2: ''
    },
    nbrPions : 42
  });


  constructor() { }

  getJeuSubjectDataObservable(): Observable<JeuInfos> {
    return this.jeuxSubject.asObservable();
  }

  initializeTable(hauteur: number, taille: number) {
    
    this.actualPlayer = this.jeuxSubject.getValue().players.color1; // ca c'est nouveau , c'est pour dire que la colour de départ est celle du joueur 1
    for (let i = 0; i < hauteur; i++) {
      this.grille[i] = [];
      for (let j = 0; j < taille; j++) {
        this.grille[i][j] = { colonne: j, couleur: "white" };

      }

    }
  }
  placerPion(data: CaseData) {

    const inf = this.jeuxSubject.getValue();
    if(inf.terminee===true){
      return;
    }

    let j: number = data.colonne;
    let i: number = this.grille.length - 1
    while (i >= 0 && this.grille[i][j].couleur !== "white") {
      i--;
    }
    if (i >= 0) {
      this.grille[i][j].couleur = this.actualPlayer;
      this.jeuxSubject.next({ gagnant: "", terminee: false, players: inf.players,nbrPions : inf.nbrPions-1  });
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
    const inf = this.jeuxSubject.getValue();
    if(inf.nbrPions===0){
      this.setGagnant("white"); // on passe white à la fonction pour dire qu'il y a égalite
    }
    this.verifierHorizontale(ligne, colonne, couleur);
    this.verifierVerticale(ligne, colonne, couleur);
    this.verifierDiagonaleDroite(ligne,colonne,couleur);
    this.verifierDiagonaleGauche(ligne,colonne,couleur);

  }

  verifierHorizontale(ligne: number, colonne: number, couleur: string) {
    let alignement: number = 0;
    let deb: number;
    let fin: number
    if (colonne > 2) {
      deb = colonne - 3;
      if (colonne > 3) {
        fin = this.grille[0].length - 1;
      }
      else {
        fin = colonne + 3;
      }
    }
    else {
      deb = 0;
      fin = colonne + 3;
    }

    while (deb <= fin && alignement < 4) {

      if (this.grille[ligne][deb].couleur === couleur) {
        alignement++;
      }
      else {
        alignement = 0
      }

      deb++;

    }

    

    if (alignement >= 4) {
      this.setGagnant(couleur);
    }


  }





  verifierVerticale(ligne: number, colonne: number, couleur: string) {
    let alignement: number = 0;
    let i: number = ligne;
    if (ligne < 3) {
      while (i < this.grille.length && this.grille[i][colonne].couleur === couleur) {
        i++;
        alignement++;
      }
      console.log(alignement);
      if (alignement >= 4) {
        this.setGagnant(couleur);
      }
    }

  }


  verifierDiagonaleDroite(ligne: number, colonne: number, couleur: string) {

    // on parcourt la diagonale des septs cases d'alignement possible en partant du bas de la grille et en remontant vers la droite
  
    let alignement: number = 0;
    let debC : number = colonne - 3;
    let finC : number = colonne + 3;
    let debL : number = ligne + 3;
    let finL : number = ligne - 3;

    // on cherche un début et une fin pour la diagonale qui ne soient pas en dehors de la grille 
    while(debL>= this.grille.length || debC < 0){
      debL--;
      debC++;
    }
    while(finL<0 || finC>= this.grille[0].length){
      finL++;
      finC--;
    }
    
   
    console.log(debC,finC,debL,finL);

    while (debL >= finL && debC<=finC && alignement < 4) {

      if (this.grille[debL][debC].couleur === couleur) {
        alignement++;
      }
      else {
        alignement = 0
      }

      debC++;
      debL--;

    }

    

    if (alignement >= 4) {
      this.setGagnant(couleur);
    }


  }

  verifierDiagonaleGauche(ligne: number, colonne: number, couleur: string) {
    // on parcourt la diagonale des septs cases d'alignement possible en partant du bas de la grille et en remontant vers la gauche
    let alignement: number = 0;
    let debC : number = colonne + 3;
    let finC : number = colonne - 3;
    let debL : number = ligne + 3;
    let finL : number = ligne - 3;
    // on cherche un début et une fin pour la diagonale qui ne soient pas en dehors de la grille 
    while(debL>= this.grille.length || debC >= this.grille[0].length){
      debL--;
      debC--;
    }
    while(finL<0 || finC < 0){
      finL++;
      finC++;
    }
    
   
    console.log(debC,finC,debL,finL);
    
    while (debL >= finL && debC>=finC && alignement < 4) {

      if (this.grille[debL][debC].couleur === couleur) {
        alignement++;
      }
      else {
        alignement = 0
      }

      debC--;
      debL--;

    }

    

    if (alignement >= 4) {
      this.setGagnant(couleur);
    }


  }


  setGagnant(couleur: string) {

    const inf = this.jeuxSubject.getValue();
    console.log(couleur);
    if(couleur==="white"){
      this.jeuxSubject.next({ gagnant: "egalite", terminee: true, players: inf.players, nbrPions : inf.nbrPions });
    }
    else{
      if (inf.players.color1 === couleur) {
        this.jeuxSubject.next({ gagnant: inf.players.pseudo1, terminee: true, players: inf.players, nbrPions : inf.nbrPions });
      }
      else {
        this.jeuxSubject.next({ gagnant: inf.players.pseudo2, terminee: true, players: inf.players, nbrPions : inf.nbrPions });
      }
    }

  }

  restart() {
    const inf = this.jeuxSubject.getValue();
    this.jeuxSubject.next({ gagnant: "", terminee: false, players: inf.players,nbrPions : 42  });

    this.initializeTable(this.grille.length, this.grille[0].length);
    this.actualPlayer = inf.players.color1;

  }

  getPlayers() {

  }
}
