import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/controller/session/session.service';
import { Howl } from 'howler';
import CLASSES from 'src/app/config/classes';
import { RecordService } from 'src/app/controller/record/record.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-speak-comfirm-page',
  templateUrl: './speak-comfirm-page.component.html',
  styleUrls: ['./speak-comfirm-page.component.scss']
})
export class SpeakComfirmPageComponent implements OnInit {
  public classLabels: string[] = CLASSES;

  constructor(
    public recordService: RecordService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    for (let i = 0; i < CLASSES.length; i ++) {
      if (!this.sessionService.getSessionRecordingUrl(i)) {
        this.router.navigateByUrl("/");
        return;
      }
    }
  }

  public playback(id: number): void {
    let recording = this.sessionService.getSessionRecordingUrl(id);
    let sound = new Howl({
      src: [recording],
      format: ['wav']
    });
    sound.play();
  }

  public recordAgain(id: number): void {
    this.recordService.recordAudio(2000).then((result) => {
      this.sessionService.setSessionRecording(id, result);
    }, (reason) => {

    });
  }

  public submitRecordings(): void {
    this.sessionService.submitSessionRecordings().then((result) => {
      this.sessionService.resetSessionRecordings();
      this.router.navigateByUrl('/thank');
    }, (error) => {
      console.log("Cannot submit recordings! " + error);
    });
  }
}
