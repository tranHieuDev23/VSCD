import { Injectable } from '@angular/core';
import * as hyperid from 'hyperid';
import CLASSES from 'src/app/config/classes';
import ValidationRequest from 'src/app/model/validation-request';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private uuid: string;
  private sessionRecordings: any[] = [];
  private sessionRecordingUrls: string[] = [];
  private sessionValidationRequests: ValidationRequest[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.uuid = hyperid().uuid;
    this.resetSessionRecordings();
  }

  public getUuid(): string {
    return this.uuid;
  }

  public resetSessionRecordings(): void {
    this.sessionRecordings = new Array(CLASSES.length);
  }

  public resetSessionValidationRequests(): void {
    this.sessionValidationRequests = [];
  }

  public setSessionRecording(id: number, data: any): void {
    this.sessionRecordings[id] = data;
    this.sessionRecordingUrls[id] = URL.createObjectURL(data);
  }

  public getSessionRecordingUrl(id: number): any {
    return this.sessionRecordingUrls[id];
  }

  public submitSessionRecordings(): Promise<any> {
    let formData = new FormData();
    for (let i = 0; i < CLASSES.length; i++) {
      let file = new File([this.sessionRecordings[i]], CLASSES[i] + '.wav', { type: 'video/webm' });
      formData.append(CLASSES[i], file, CLASSES[i] + '.wav');
    }
    formData.append('authorId', this.getUuid());
    return this.http.post<any>('/api/speak-submit', formData).toPromise();
  }

  public fetchValidationRequests(): Promise<void> {
    return new Promise((resolve, reject) => {
      const requestData = {
        'userId': this.getUuid()
      };
      this.http.post<any>('/api/get-validation-requests', requestData).toPromise().then((result) => {
        let validationRequests: ValidationRequest[] = [];
        for (let i = 0; i < result.length; i++) {
          let validationId = result[i].validationId;
          let label = result[i].label;
          validationRequests.push(new ValidationRequest(validationId, label));
        }
        this.sessionValidationRequests = validationRequests;
        resolve();
      }, reject);
    });
  }

  public getValidationRequestsCount(): number {
    return this.sessionValidationRequests.length;
  }

  public setValidation(id: number, validation: boolean): void {
    this.sessionValidationRequests[id].result = validation;
  }

  public getValidationRequest(id: number): Promise<ValidationRequest> {
    return new Promise<ValidationRequest>((resolve, reject) => {
      if (this.sessionValidationRequests[id].data) {
        return resolve(this.sessionValidationRequests[id]);
      }
      const requestData = {
        'validationId': this.sessionValidationRequests[id].validationId
      };
      this.http.post('/api/get-validation-audio', requestData, {
        responseType: 'blob'
      }).toPromise().then((result) => {
        this.sessionValidationRequests[id].data = URL.createObjectURL(result);
        return resolve(this.sessionValidationRequests[id]);
      }, reject);
    });
  }

  public getSessionValidationRequests(): ValidationRequest[] {
    return this.sessionValidationRequests;
  }

  public submitValidations(): Promise<void> {
    const requestData = [];
    for (let i = 0; i < this.sessionValidationRequests.length; i++) {
      requestData.push({
        'validationId': this.sessionValidationRequests[i].validationId,
        'result': this.sessionValidationRequests[i].result
      });
    }
    return this.http.post<void>('/api/validation-submit', requestData).toPromise();
  }
}
