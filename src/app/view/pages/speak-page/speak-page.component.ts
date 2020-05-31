import { Component } from '@angular/core';
import { RecordService } from 'src/app/controller/record/record.service';
import { Howl } from 'howler';
import { SessionService } from 'src/app/controller/session/session.service';
import CLASSES from 'src/app/config/classes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-speak-page',
  templateUrl: './speak-page.component.html',
  styleUrls: ['./speak-page.component.scss']
})
export class SpeakPageComponent {
  public currentClassId: number = 1;
  public currentClassLabel: string;
  public classCount: number = CLASSES.length;
  public currentRecording: any = null;

  constructor(
    public recordService: RecordService,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.currentClassLabel = CLASSES[this.currentClassId - 1];
    this.sessionService.resetSessionRecordings();
  }

  public startRecording(): void {
    this.recordService.recordAudio(2000).then((result) => {
      this.currentRecording = result;
    }, (reason) => {

    });
  }

  public playback(): void {
    if (!this.currentRecording) {
      return;
    }
    let sound = new Howl({
      src: [this.currentRecording],
      ext: ['wav']
    });
    sound.play();
  }

  public next(): void {
    if (!this.currentRecording) {
      return;
    }
    this.sessionService.setSessionRecording(this.currentClassId - 1, this.currentRecording);
    if (this.currentClassId < this.classCount) {
      this.currentClassId++;
      this.currentClassLabel = CLASSES[this.currentClassId - 1];
      this.currentRecording = null;
    } else {
      this.router.navigateByUrl('/speak-confirm');
    }
  }
}
