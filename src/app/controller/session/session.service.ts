import { Injectable } from '@angular/core';
import * as hyperid from 'hyperid';
import CLASSES from 'src/app/config/classes';
import ValidationRequest from 'src/app/model/validation-request';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private uuid: string;
  private sessionRecordings: string[] = [];
  private sessionValidationRequests: ValidationRequest[] = [];

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

  public fetchValidationRequests(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.sessionValidationRequests = [
        new ValidationRequest("0", "Không"),
        new ValidationRequest("1", "Một"),
        new ValidationRequest("2", "Hai"),
        new ValidationRequest("3", "Ba"),
      ];
      resolve();
    });
  }

  public getValidationRequestsCount(): number {
    return this.sessionValidationRequests.length;
  }

  public setValidation(id: number, validation: boolean): void {
    this.sessionValidationRequests[id].validation = validation;
  }

  public getValidationRequest(id: number): Promise<ValidationRequest> {
    return new Promise<ValidationRequest>((resolve, reject) => {
      if (this.sessionValidationRequests[id].data) {
        return resolve(this.sessionValidationRequests[id]);
      }
      this.sessionValidationRequests[id].data = "/#";
      return resolve(this.sessionValidationRequests[id]);
    });
  }

  public getSessionValidationRequests(): ValidationRequest[] {
    return this.sessionValidationRequests;
  }

  public submitValidations(): void {
    console.log(this.sessionValidationRequests);
  }
}
