import { Injectable } from '@angular/core';
import * as hyperid from 'hyperid';
import CLASSES from 'src/app/config/classes';
import ValidationRequest from 'src/app/model/validation-request';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl: string;
  private uuid: string;
  private mssvNcode: string = null;
  private mssvWasSet: boolean = false;
  private sessionRecordings: any[] = [];
  private sessionRecordingUrls: string[] = [];
  private sessionValidationRequests: ValidationRequest[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.apiUrl = environment.apiUrl;
    this.uuid = hyperid().uuid;
    this.resetSessionRecordings();
  }

  public getUuid(): string {
    return this.uuid;
  }

  public setMssvOnce(mssv: string): void {
    if (this.mssvWasSet) {
      return;
    }
    this.mssvNcode = mssv;
    this.mssvWasSet = true;
  }

  public getMssvNcode(): string {
    return this.mssvNcode;
  }

  public clearMssv(): void {
    this.mssvNcode = null;
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
    if (this.mssvNcode) {
      formData.append('mssvNcode', this.mssvNcode);
    }
    return this.http.post<any>(this.apiUrl + '/api/speak-submit', formData).toPromise();
  }

  public fetchValidationRequests(): Promise<void> {
    return new Promise((resolve, reject) => {
      const requestData = {
        'userId': this.getUuid()
      };
      this.http.post<any>(this.apiUrl + '/api/get-validation-requests', requestData).toPromise().then((result) => {
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

  public getValidationRequest(id: number): ValidationRequest {
    return this.sessionValidationRequests[id];
  }

  public fetchValidationAudio(request: ValidationRequest): Promise<ValidationRequest> {
    return new Promise((resolve, reject) => {
      const requestData = {
        'validationId': request.validationId
      };
      this.http.post(this.apiUrl + '/api/get-validation-audio', requestData, {
        responseType: 'blob'
      }).toPromise().then((result) => {
        request.data = URL.createObjectURL(result);
        resolve(request);
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
    return this.http.post<void>(this.apiUrl + '/api/validation-submit', requestData).toPromise();
  }
}
