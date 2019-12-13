import { FilmeDetalhesPage } from './../filme-detalhes/filme-detalhes';
import { MovieProvider } from './../../providers/movie/movie';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

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
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;

  // JSON
  public objeto_feed = {
    titulo: "Leo Buck",
    data: "November 5, 1955",
    descricao: "Estou criando um app incrível!",
    qntd_likes: 12,
    qntd_comments: 4,
    time_comment: "11h ago"
  }

  public lista_filmes = Array<any>();
  public page = 1;

  public nome_usuario: string = "Leo Buck do Código";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController) {
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes..."
    });
    this.loader.present();
  }

  fechaCarregando() {
    this.loader.dismiss();
  }

  public somaDoisNumeros(num1: number, num2: number): void {
    alert(num1 + num2);
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    this.carregarFilmes();
  }

  ionViewDidEnter() {
    //this.somaDoisNumeros(10, 99);
    this.carregarFilmes();
  }

  abrirDetalhes(filme) {
    console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);
  }

  carregarFilmes(newpage: boolean = false) {
    this.abreCarregando();

    this.movieProvider.getPopularMovies(this.page).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);

        if (newpage) {
          this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results);
          this.infiniteScroll.complete();
        } else {
          this.lista_filmes = objeto_retorno.results;
        }

        this.fechaCarregando();

        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }

      }, error => {
        console.log(error);
        this.fechaCarregando();
      }
    );
  }
}
