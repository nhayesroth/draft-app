import { Player } from '../players/player';

interface Args {
  player: Player,
  owner: string,
  round: number,
  pick: number,
}

export class PlayerSelection {
  player: Player;
  owner: string;
  round: number;
  pick: number;

  constructor(args: Args) {
    this.player = args.player;
    this.owner = args.owner;
    this.round = args.round;
    this.pick = args.pick;
  }

  static newBuilder() {
    return new Builder();
  }
}

class Builder {
  private owner: string;
  private pick: number;
  private player: Player;
  private round: number;

  constructor() {
    this.owner = '';
    this.pick = -1;
    this.round = -1;
    this.player = Player.newBuilder().setName('not a real player').build();
  }

  setOwner(owner: string) {
    this.owner = owner;
    return this;
  }

  setPick(pick: number) {
    this.pick = pick;
    return this;
  }

  setRound(round: number) {
    this.round = round;
    return this;
  }

  setPlayer(player: Player) {
    this.player = player;
    return this;
  }

  build() {
    return new PlayerSelection(
      {owner: this.owner, pick: this.pick, player: this.player, round: this.round},
    );
  }
}
