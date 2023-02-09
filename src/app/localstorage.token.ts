import {InjectionToken} from "@angular/core";

export const localstorageToken = new InjectionToken('localstorage', {
  providedIn: 'root',
  factory: () => localStorage
});
