import { Injectable } from '@angular/core';
import * as hyperid from 'hyperid';
import CLASSES from 'src/app/config/classes';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private uuid: string;
  private sessionRecordings: string[];

  constructor() {
    this.uuid = hyperid().uuid;
    this.resetSessionRecordings();
  }

  public getUuid(): string {
    return this.uuid;
  }

  public resetSessionRecordings(): void {
    this.sessionRecordings = new Array(CLASSES.length);
  }

  public setSessionRecording(id: number, data: any): void {
    this.sessionRecordings[id] = data;
  }

  public getSessionRecording(id: number): any {
    return this.sessionRecordings[id];
  }

  public submitSessionRecordings(): void {
    console.log(this.sessionRecordings);
  }
}
