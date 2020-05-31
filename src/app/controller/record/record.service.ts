import { Injectable } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { StereoAudioRecorder } from 'recordrtc';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private cachedRecorder = null;
  private isRecording: boolean = false;

  constructor() { }

  private async getRecorder(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this.cachedRecorder) {
        return resolve(this.cachedRecorder);
      }
      navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(async (stream) => {
        this.cachedRecorder = RecordRTC(stream, {
          type: 'audio',
          recorderType: StereoAudioRecorder,
          desiredSampRate: 16000,
          numberOfAudioChannels: 1
        });
        return resolve(this.cachedRecorder);
      }, reject);
    });
  }

  public recordAudio(duration: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.isRecording = true;
      this.getRecorder().then((recorder) => {
        recorder.setRecordingDuration(duration, () => {
          this.isRecording = false;
          let blob = recorder.getBlob();
          recorder.reset();
          resolve(blob);
        });
        recorder.startRecording();
      }, (error) => {
        this.isRecording = false;
        reject(error);
      });
    });
  }

  public getIsRecording(): boolean {
    return this.isRecording;
  }
}
