import { PlayerSelection } from './player-selection';
import { Player } from '../players/player';
import { Position } from '../positions/position';

interface Args {
  numRounds: number,
  numTeams: number,
  currentRound: number,
  currentPick: number,
  selections: (PlayerSelection | null)[][],
  players: Player[],
  positions: Position[],
}

export class Draft {
  readonly numRounds: number;
  readonly numTeams: number;
  readonly currentRound: number;
  readonly currentPick: number;
  selections: (PlayerSelection | null)[][];
  players: Player[];
  positions: Position[];

  constructor(args: Args) {
    this.numRounds = args.numRounds;
    this.numTeams = args.numTeams
    this.currentRound = args.currentRound
    this.currentPick = args.currentPick
    this.selections = args.selections;
    this.players = args.players;
    this.positions = args.positions;
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
      .setSelections(this.selections)
      .setPlayers(this.players)
      .setPositions(this.positions);
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
}

class Builder {
  private numRounds: number;
  private numTeams: number;
  private selections: (PlayerSelection | null)[][];
  private currentRound: number;
  private currentPick: number;
  private players: Player[];
  private positions: Position[];

  constructor() {
    this.numRounds = -1;
    this.numTeams = -1
    this.currentRound = 1;
    this.currentPick = 1;
    this.selections = [];
    this.players = [];
    this.positions = [];
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
      players: this.players,
      positions: this.positions,
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

  setPlayers(players: Player[]) {
    this.players = players;
    return this;
  }

  setPositions(positions: Position[]) {
    this.positions = positions;
    return this;
  }
}
