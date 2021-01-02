import { Position } from '../positions/position';
import { Team } from '../teams/team';

interface PlayerArgs {
    team: Team;
    name: string,
    school: string,
    position: Position,
    age: number,
}

export class Player {
    readonly school: string;
    readonly position: Position;
    readonly name: string;
    readonly age: number;
    readonly team: Team;

    constructor(args: PlayerArgs) {
        this.school = args.school;
        this.position = args.position
        this.name = args.name;
        this.age = args.age;
        this.team = args.team;
    }

    static newBuilder() {
        return new PlayerBuilder();
    }
}

export class PlayerBuilder {
    private name: string;
    private position: Position;
    private team: Team;
    private school: string;
    private age: number;

    constructor() {
        this.position = Position.NO_POSITION;
        this.team = Team.NO_TEAM;
        this.age = 0;
        this.school = '';
        this.name = '';
    }

    setName(name: string) {
        this.name = name;
        return this;
    }

    setSchool(school: string) {
        this.school = school;
        return this;
    }

    setPosition(position: Position) {
        this.position = position;
        return this;
    }

    setTeam(team: Team) {
        this.team = team;
        return this;
    }

    setAge(age: number) {
        this.age = age;
        return this;
    }

    build() {
        return new Player({
            name: this.name,
            school: this.school,
            position: this.position,
            age: this.age,
            team: this.team,
        });
    }
}
