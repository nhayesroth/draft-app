import { PlayerSelection } from './player-selection';
import { Player } from '../players/player';
import { Position } from '../positions/position';
import { State } from './state';
import { Pick } from './pick';

interface Args {
  userPicks: Pick[];
  teamNames?: string[];
  numRounds: number,
  numTeams: number,
  currentRound: number,
  currentPick: number,
  selections: (PlayerSelection | null)[][],
  players: Player[],
  positions: Position[],
  state?: State,
}

export class Draft {
  readonly numRounds: number;
  readonly numTeams: number;
  readonly teamNames: string[];
  readonly currentRound: number;
  readonly currentPick: number;
  readonly state: State;
  readonly userPicks: Pick[];
  selections: (PlayerSelection | null)[][];
  players: Player[];
  positions: Position[];

  constructor(args: Args) {
    this.numRounds = args.numRounds;
    this.numTeams = args.numTeams
    this.teamNames = args.teamNames || Draft.generateTeamNames(args.numTeams);
    this.currentRound = args.currentRound
    this.currentPick = args.currentPick
    this.selections = args.selections;
    this.players = args.players;
    this.positions = args.positions;
    this.state = args.state || State.CONFIGURING;
    this.userPicks = args.userPicks;
  }

  static generateTeamNames(numTeams: number): string[] {
    return [...Array(numTeams).keys()]
      .map(index => 'Team-' + (index + 1));
  }

  static newBuilder() {
    return new Builder();
  }

  toBuilder(): Builder {
    return new Builder()
      .setNumRounds(this.numRounds)
      .setNumTeams(this.numTeams)
      .setCurrentRound(this.currentRound)
      .setCurrentPick(this.currentPick)
      .setSelections(this.selections)
      .setPlayers(this.players)
      .setPositions(this.positions)
      .setState(this.state)
      .setUserPicks(this.userPicks)
      .setTeamNames(this.teamNames);
  }

  makePlayerSelection(selection: PlayerSelection) {
    // TODO: deep copy this
    if (!this.selections[selection.round]) {
      this.selections[selection.round] = [];
    }
    this.selections[selection.round][selection.pick] = selection;
    console.log('makePlayerSelection', selection.round, selection.pick, selection.player.name);
    return this.toBuilder()
      .setSelections(this.selections)
      .build()
      .incrementPick();
  }

  removeSelection(round: number, pick: number) {
    // TODO: deep copy this
    this.selections[round][pick] = null;
    return this.toBuilder()
      .setSelections(this.selections)
      .build();
  }

  incrementPick() {
    return this.toBuilder()
      .setCurrentRound(
        this.currentPick < this.numTeams
          ? this.currentRound
          : this.currentRound + 1)
      .setCurrentPick(
        this.currentPick < this.numTeams
          ? this.currentPick + 1
          : 1)
      .build();
  }

  resetPicks() {
    return this.toBuilder()
      .setCurrentRound(1)
      .setCurrentPick(1)
      .setSelections([])
      .build();
  }

  alreadyDrafted(player: Player) {
    for (let round = 0; round < this.selections.length; round += 1) {
      for (let pick = 0; pick < this.selections[round]?.length; pick++) {
        const draftedPlayer = this.selections[round][pick]?.player;
        if (draftedPlayer && player.equals(draftedPlayer)) {
          return true;
        }
      }
    }
    return false;
  }

  isComplete() {
    if (this.currentRound <= this.numRounds) {
      console.log(`isComplete()? (${this.currentRound}.${this.currentPick}) - this.currentRound(${this.currentRound}) <= this.numRounds(${this.numRounds})`, this.currentRound <= this.numRounds)
      return false;
    }
    for (let round = 1; round < this.selections.length; round += 1) {
      for (let pick = 1; pick < this.selections[round]?.length; pick++) {
        const draftedPlayer = this.selections[round][pick]?.player;
        if (!draftedPlayer) {
          return false;
        }
      }
    }
    return true;
  }

  inProgress(): boolean {
    switch (this.state) {
      case State.AUTO_DRAFT:
      case State.USER_PICK:
        return true;
      default:
        return false;
    }
  }

  restart(): Draft {
    return this.toBuilder()
      .setSelections([])
      .setCurrentRound(1)
      .setCurrentPick(1)
      .setState(State.CONFIGURING)
      .build();
  }

  pause(): Draft {
    return this.toBuilder()
      .setState(State.PAUSED)
      .build();
  }

  start(): Draft {
    return this.toBuilder()
      .setCurrentRound(1)
      .setCurrentPick(1)
      .setState(State.AUTO_DRAFT)
      .build();
  }

  resume() {
    return this.toBuilder()
      .setState(State.AUTO_DRAFT)
      .build();
  }

  private finish() {
    return this.toBuilder()
      .setState(State.FINISHED)
      .build();
  }

  isUserPick(): boolean {
    const currentPick = new Pick(this.currentRound, this.currentPick);
    return this.userPicks.some(pick => pick.equals(currentPick));
  }
}

class Builder {
  private numRounds: number;
  private numTeams: number;
  private selections: (PlayerSelection | null)[][];
  private currentRound: number;
  private currentPick: number;
  private players: Player[];
  private positions: Position[];
  private state: State;
  private userPicks: Pick[];
  private teamNames: string[];

  constructor() {
    this.numRounds = 5;
    this.numTeams = 10
    this.currentRound = 1;
    this.currentPick = 1;
    this.selections = [];
    this.players = [];
    this.positions = [];
    this.state = State.CONFIGURING
    this.userPicks = [];
    this.teamNames = [];
  }

  setNumRounds(numRounds: number) {
    this.numRounds = numRounds;
    return this;
  }

  setNumTeams(numTeams: number) {
    this.numTeams = numTeams;
    return this;
  }

  setSelections(selections: (PlayerSelection | null)[][]) {
    this.selections = selections;
    return this;
  }

  setCurrentRound(currentRound: number): Builder {
    this.currentRound = currentRound;
    return this;
  }

  setCurrentPick(currentPick: number): Builder {
    this.currentPick = currentPick;
    return this;
  }

  setPlayers(players: Player[]): Builder {
    this.players = players;
    return this;
  }

  setPositions(positions: Position[]): Builder {
    this.positions = positions;
    return this;
  }

  setState(state: State): Builder {
    this.state = state;
    return this;
  }

  setUserPicks(userPicks: Pick[]): Builder {
    this.userPicks = userPicks;
    console.log('setUserPicks()', userPicks);
    return this;
  }

  setTeamNames(teamNames: string[]): Builder {
    this.teamNames = teamNames;
    return this;
  }

  build() {
    // Finish the draft if we've reached the end without doing so.
    if (this.currentRound > this.numRounds) {
      this.currentRound = this.numRounds;
      this.currentPick = this.numTeams;
      this.state = State.FINISHED;
    }
    // Set the state if the user owns this pick.
    if (this.state === State.AUTO_DRAFT
      && this.userPicks.some(pick => pick.equals(new Pick(this.currentRound, this.currentPick)))) {
      this.state = State.USER_PICK;
    }
    // Set the state if the computer owns this pick.
    if (this.state === State.USER_PICK
      && !this.userPicks.some(pick => pick.equals(new Pick(this.currentRound, this.currentPick)))) {
      this.state = State.AUTO_DRAFT;
    }
    // Make sure we populate team names for computer drafters.
    if (this.teamNames.length !== this.numTeams) {
      for (let i = 0; i < this.numTeams; i++) {
        const teamName = this.teamNames[i];
        if (!teamName) {
          this.teamNames[i] = 'Team-' + (i + 1);
        }
      }
    }
    return new Draft({
      numRounds: this.numRounds,
      numTeams: this.numTeams,
      currentRound: this.currentRound,
      currentPick: this.currentPick,
      selections: this.selections,
      players: this.players,
      positions: this.positions,
      state: this.state,
      userPicks: this.userPicks,
      teamNames: this.teamNames,
    });
  }
}
