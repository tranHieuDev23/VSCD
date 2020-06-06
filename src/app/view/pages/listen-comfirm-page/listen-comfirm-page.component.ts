import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/controller/session/session.service';
import ValidationRequest from 'src/app/model/validation-request';
import { Howl } from 'howler';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-listen-comfirm-page',
  templateUrl: './listen-comfirm-page.component.html',
  styleUrls: ['./listen-comfirm-page.component.scss']
})
export class ListenComfirmPageComponent implements OnInit {
  public validationRequests: ValidationRequest[] = [];
  public isSubmitting: boolean = false;
  public errorMessage: string = null;

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
    this.validationRequests[id].result = !this.validationRequests[id].result;
  }

  public submitValidations(): void {
    this.isSubmitting = true;
    this.sessionService.submitValidations().then((result) => {
      this.isSubmitting = false;
      this.sessionService.resetSessionValidationRequests();
      this.errorMessage = null;
      this.router.navigateByUrl("/thank");
    }, (error) => {
      this.isSubmitting = false;
      if (error instanceof HttpErrorResponse) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = error;
      }
    });
  }
}
