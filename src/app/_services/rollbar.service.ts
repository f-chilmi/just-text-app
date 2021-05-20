import { ErrorHandler, Inject, Injectable, InjectionToken } from '@angular/core';
import * as Rollbar from 'rollbar'; 

const rollbarConfig = {
  accessToken: '8ed371e89c26478f9244a3def6fca909',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
  constructor(@Inject(RollbarService) private rollbar: Rollbar) {}

  handleError(err) : void {
    this.rollbar.error(err.originalError || err);
  }
}

export function rollbarFactory() {
  return new Rollbar(rollbarConfig);
}

export const RollbarService = new InjectionToken<Rollbar>('rollbar');