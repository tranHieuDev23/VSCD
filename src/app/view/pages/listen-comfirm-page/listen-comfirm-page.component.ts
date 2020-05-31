import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/controller/session/session.service';
import ValidationRequest from 'src/app/model/validation-request';
import { Howl } from 'howler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listen-comfirm-page',
  templateUrl: './listen-comfirm-page.component.html',
  styleUrls: ['./listen-comfirm-page.component.scss']
})
export class ListenComfirmPageComponent implements OnInit {
  public validationRequests: ValidationRequest[] = [];

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.validationRequests = this.sessionService.getSessionValidationRequests();
    if (this.validationRequests.length == 0) {
      this.router.navigateByUrl("/");
    }
  }

  public playback(id: number): void {
    let data = this.validationRequests[id].data;
    let sound = new Howl({
      src: [data],
      format: ['wav']
    });
    sound.play();
  }

  public changeValidation(id: number): void {
    this.validationRequests[id].validation = !this.validationRequests[id].validation;
  }

  public submitValidations(): void {
    this.sessionService.submitValidations();
  }
}
