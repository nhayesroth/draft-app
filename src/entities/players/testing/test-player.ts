import { Position } from '../../positions/position';
import { Player } from '../player';
import { Random } from '../../../utils/random';

export class TestPlayer {
    static newMaker() {
        return new TestPlayerMaker();
    }
}

class TestPlayerMaker {
    private playersToMake;

    constructor() {
        this.playersToMake = new Map<Position, number>();
    }

    add(position: Position, count: number) {
        this.playersToMake.set(
            position,
            (this.playersToMake.get(position) || 0) + count);
        return this;
    };

    run(): Player[] {
        return Array.from<Position>(this.playersToMake.keys())
            .map(
                (position) =>
                    Player.newBuilder()
                        .setPosition(position)
                        .setSchool(Random.string())
                        .setName(Random.string())
                        .build())
            .flat();
    }
}
