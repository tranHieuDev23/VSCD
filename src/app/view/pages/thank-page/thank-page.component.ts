import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/controller/session/session.service';

@Component({
  selector: 'app-thank-page',
  templateUrl: './thank-page.component.html',
  styleUrls: ['./thank-page.component.scss']
})
export class ThankPageComponent implements OnInit {
  public isRedirecting: boolean = false;

  constructor(
    private sessionService: SessionService
  ) {
  }

  ngOnInit(): void {
    if (this.sessionService.getMssvNcode()) {
      this.isRedirecting = true;
      setTimeout(() => {
        window.location.href = 'https://attendance.pitec.vn/';
      }, 3000);
    }
  }

}
