/**
 * Basic class that describes a draft pick (round and pick numbers only).
 */
export class Pick {
  readonly round: number;
  readonly pick: number;

  constructor(round: number, pick: number) {
    this.round = round;
    this.pick = pick;
  }

  equals(other: Pick) {
    return this.round === other.round
      && this.pick === other.pick;
  }
}
