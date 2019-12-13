import { CameraPage } from './../camera/camera';
import { AtletasPageModule } from './../atletas/atletas.module';
import { ConfiguracoesPage } from './../configuracoes/configuracoes';
import { FeedPage } from './../feed/feed';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AtletasPage } from '../atletas/atletas';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab4Root = FeedPage;
  tab5Root = ConfiguracoesPage;
  tab6Root = AtletasPage;
  tab7Root = CameraPage;

  constructor() {

  }
}
