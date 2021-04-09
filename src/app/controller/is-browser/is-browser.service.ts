import { Injectable } from '@angular/core';
import is from "is_js";

@Injectable({
  providedIn: 'root'
})
export class IsBrowserService {
  public readonly isChrome: boolean = is.chrome();
  public readonly isFirefox: boolean = is.firefox();

  constructor() {
  }
}
