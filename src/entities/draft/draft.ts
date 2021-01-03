import { PlayerSelection } from './player-selection';

interface Args {
  numRounds: number,
  numTeams: number,
  currentRound: number,
  currentPick: number,
  selections: (PlayerSelection | null)[][],
}

export class Draft {
  readonly numRounds: number;
  readonly numTeams: number;
  readonly currentRound: number;
  readonly currentPick: number;
  selections: (PlayerSelection | null)[][];

  constructor(args: Args) {
    this.numRounds = args.numRounds;
    this.numTeams = args.numTeams
    this.currentRound = args.currentRound
    this.currentPick = args.currentPick
    this.selections = args.selections;
  }

  static newBuilder() {
    return new Builder();
  }

  toBuilder() {
    return new Builder()
      .setNumRounds(this.numRounds)
      .setNumTeams(this.numTeams)
      .setCurrentRound(this.currentRound)
      .setCurrentPick(this.currentPick)
      .setSelections(this.selections);
  }

  makePlayerSelection(selection: PlayerSelection) {
    // TODO: deep copy this
    if (!this.selections[selection.round]) {
      this.selections[selection.round] = [];
    }
    this.selections[selection.round][selection.pick] = selection;
    return this.toBuilder()
      .setSelections(this.selections)
      .build();
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
        this.currentPick <= this.numTeams
          ? this.currentRound
          : this.currentRound + 1)
      .setCurrentPick(
        this.currentPick <= this.numTeams
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
}

class Builder {
  private numRounds: number;
  private numTeams: number;
  private selections: (PlayerSelection | null)[][];
  private currentRound: number;
  private currentPick: number;

  constructor() {
    this.numRounds = -1;
    this.numTeams = -1
    this.currentRound = 1;
    this.currentPick = 1;
    this.selections = [];
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

  build() {
    return new Draft({
      numRounds: this.numRounds,
      numTeams: this.numTeams,
      currentRound: this.currentRound,
      currentPick: this.currentPick,
      selections: this.selections,
    });
  }

  setCurrentRound(currentRound: number) {
    this.currentRound = currentRound;
    return this;
  }

  setCurrentPick(currentPick: number) {
    this.currentPick = currentPick;
    return this;
  }
}
