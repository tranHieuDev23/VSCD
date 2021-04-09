import { Component, OnInit } from '@angular/core';
import { RecordService } from 'src/app/controller/record/record.service';
import { Howl } from 'howler';
import { SessionService } from 'src/app/controller/session/session.service';
import CLASSES from 'src/app/config/classes';
import { Router, ActivatedRoute } from '@angular/router';
import { IsBrowserService } from 'src/app/controller/is-browser/is-browser.service';

@Component({
  selector: 'app-speak-page',
  templateUrl: './speak-page.component.html',
  styleUrls: ['./speak-page.component.scss']
})
export class SpeakPageComponent implements OnInit {
  public classCount: number = CLASSES.length;

  public currentClassId: number;
  public currentClassLabel: string;
  public currentRecording: any;
  public currentRecordingUrl: string;
  public currentTime: number;
  public errorMessage: string;

  constructor(
    public recordService: RecordService,
    public isBrowserService: IsBrowserService,
    private sessionService: SessionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.init(1);
    this.sessionService.resetSessionRecordings();
  }

  private init(classId: number) {
    this.currentClassId = classId;
    this.currentClassLabel = CLASSES[classId - 1];
    this.currentRecording = null;
    this.currentRecordingUrl = null;
    this.currentTime = 0;
    this.errorMessage = null;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const mssvNcode = params['mssvNcode'];
      if (mssvNcode) {
        this.sessionService.setMssvOnce(mssvNcode);
      }
    });
  }

  public startRecording(): void {
    const timerTimeout = this.startTimer(2);
    this.recordService.recordAudio(2000).then((result) => {
      this.currentRecording = result;
      this.currentRecordingUrl = URL.createObjectURL(result);
      clearInterval(timerTimeout);
    }, (reason) => {
      this.errorMessage = reason;
    });
  }

  public playback(): void {
    if (!this.currentRecordingUrl) {
      return;
    }
    let sound = new Howl({
      src: [this.currentRecordingUrl],
      format: ['wav']
    });
    sound.play();
  }

  private startTimer(duration: number): any {
    this.currentTime = 0;
    return setInterval(() => {
      if (this.currentTime < duration) {
        this.currentTime++;
      }
    }, 1000);
  }

  public next(): void {
    if (!this.currentRecording) {
      return;
    }
    this.sessionService.setSessionRecording(this.currentClassId - 1, this.currentRecording);
    if (this.currentClassId < this.classCount) {
      this.init(this.currentClassId + 1);
    } else {
      this.router.navigateByUrl('/speak-confirm');
    }
  }
}
