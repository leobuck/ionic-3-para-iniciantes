import { MovieProvider } from './../../providers/movie/movie';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {
  // JSON
  public objeto_feed = {
    titulo : "Leo Buck",
    data : "November 5, 1955",
    descricao : "Estou criando um app incrível!",
    qntd_likes: 12,
    qntd_comments: 4,
    time_comment: "11h ago"
  } 
  
  public lista_filmes = Array<any>();

  public nome_usuario: string = "Leo Buck do Código";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider: MovieProvider) {
  }

  public somaDoisNumeros(num1: number, num2: number): void {
    alert(num1 + num2);
  }

  ionViewDidLoad() {
    //this.somaDoisNumeros(10, 99);
    this.movieProvider.getPopularMovies().subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.lista_filmes = objeto_retorno.results;
        
        console.log(objeto_retorno);
      }, error => {
        console.log(error);
      }
    );
  }

}
