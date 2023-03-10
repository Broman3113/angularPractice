import {Inject, Injectable} from '@angular/core';
import {RouteConfigToken} from "./routeConfig.service";
import {RouteConfig} from "./routeConfig";

@Injectable({
  providedIn: 'any'
})
export class ConfigService {

  constructor(@Inject(RouteConfigToken) public routeConfig: RouteConfig) {
    console.log('ConfigService instantiated', this.routeConfig);
  }
}
