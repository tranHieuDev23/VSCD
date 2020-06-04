import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/controller/session/session.service';

@Component({
  selector: 'app-thank-page',
  templateUrl: './thank-page.component.html',
  styleUrls: ['./thank-page.component.scss']
})
export class ThankPageComponent implements OnInit {
  public mssv: string;

  constructor(
    private sessionService: SessionService
  ) {
    this.mssv = sessionService.getMssv();
    sessionService.clearMssv();
  }

  ngOnInit(): void {
  }

}
