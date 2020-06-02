import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/controller/session/session.service';
import { Howl } from 'howler';
import ValidationRequest from 'src/app/model/validation-request';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-listen-page',
  templateUrl: './listen-page.component.html',
  styleUrls: ['./listen-page.component.scss']
})
export class ListenPageComponent implements OnInit {
  public requestsCount: number;

  public currentRequestId: number;
  public currentRequest: ValidationRequest;
  public isRecordingPlayable: boolean;
  public isRecordingPlayed: boolean;
  public errorMessage: string;

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.sessionService.fetchValidationRequests().then(async () => {
      this.requestsCount = this.sessionService.getValidationRequestsCount();
      this.init(1);
    }, (error) => {
      if (error instanceof HttpErrorResponse) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = error;
      }
    });
  }

  private init(requestId: number): void {
    this.currentRequestId = requestId;
    this.currentRequest = this.sessionService.getValidationRequest(requestId - 1);
    this.isRecordingPlayable = false;
    this.isRecordingPlayed = false;
    this.errorMessage = null;
    this.sessionService.fetchValidationAudio(this.currentRequest).then((result) => {
      this.currentRequest = result;
      this.isRecordingPlayable = true;
    }, (error) => {
      if (error instanceof HttpErrorResponse) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = error;
      }
    });
  }

  public playback(): void {
    let data = this.currentRequest.data;
    let sound = new Howl({
      src: [data],
      format: ['wav']
    });
    sound.play();
    this.isRecordingPlayed = true;
  }

  public async validate(validation: boolean) {
    this.currentRequest.result = validation;
    if (this.currentRequestId < this.requestsCount) {
      this.init(this.currentRequestId + 1);
    } else {
      this.router.navigateByUrl('/listen-confirm');
    }
  }
}
