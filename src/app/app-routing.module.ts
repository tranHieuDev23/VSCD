import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './view/pages/home-page/home-page.component';
import { SpeakPageComponent } from './view/pages/speak-page/speak-page.component';
import { ThankPageComponent } from './view/pages/thank-page/thank-page.component';
import { ListenPageComponent } from './view/pages/listen-page/listen-page.component';
import { SpeakComfirmPageComponent } from './view/pages/speak-comfirm-page/speak-comfirm-page.component';
import { ListenComfirmPageComponent } from './view/pages/listen-comfirm-page/listen-comfirm-page.component';


const routes: Routes = [
  { path: "speak", component: SpeakPageComponent },
  { path: "listen", component: ListenPageComponent },
  { path: "speak-confirm", component: SpeakComfirmPageComponent },
  { path: "listen-confirm", component: ListenComfirmPageComponent },
  { path: "thank", component: ThankPageComponent },
  { path: "**", component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
