import { Injectable } from '@angular/core';
import appSettings from "#assets/appsettings.json";

@Injectable({
  providedIn: `root`,
})
export class SettingsService {
  public readonly appSettings = appSettings;

  constructor() {}
}
