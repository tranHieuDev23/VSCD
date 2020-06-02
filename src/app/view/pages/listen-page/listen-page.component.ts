import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/controller/session/session.service';
import { Howl } from 'howler';
import ValidationRequest from 'src/app/model/validation-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listen-page',
  templateUrl: './listen-page.component.html',
  styleUrls: ['./listen-page.component.scss']
})
export class ListenPageComponent implements OnInit {
  public currentRequestId: number = 1;
  public currentRequest: ValidationRequest;
  public requestsCount: number;
  public isRecordingPlayed: boolean = false;

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.sessionService.fetchValidationRequests().then(async () => {
      this.currentRequest = await this.sessionService.getValidationRequest(this.currentRequestId - 1);
      this.requestsCount = this.sessionService.getValidationRequestsCount();
    }, (error) => {
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
      this.currentRequestId ++;
      this.currentRequest = await this.sessionService.getValidationRequest(this.currentRequestId - 1);
      this.isRecordingPlayed = false;
    } else {
      this.router.navigateByUrl('/listen-confirm');
    }
  }
}
