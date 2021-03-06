import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {BotService} from '../services/bot.service';
import {
  BotActionTypes, RetrieveBotInformation, RetrieveBotInformationSuccess
} from '../actions/bot.actions';
import {catchError, map, flatMap} from 'rxjs/internal/operators';
import {BotState} from '../reducers';
import {Store} from '@ngrx/store';

@Injectable()
export class BotEffects {
  /*
  * This effect intercepts RetrieveBotInformation action and calls the service.
   */
  @Effect()
  getUserProfile = this.actions.pipe(
    ofType(BotActionTypes.RetrieveBotInformation),
    flatMap((action: RetrieveBotInformation) => this.botService.retrieveCurrentVotes(action.payload)
    .pipe(
      catchError(error => this.botService.handleError(error)),
      map((bidInfo: any) => new RetrieveBotInformationSuccess(bidInfo.current_round))
    ))
  );

  constructor(
    private actions: Actions,
    private store: Store<BotState>,
    private botService: BotService
  ) {}
}
