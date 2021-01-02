import { IllegalArgumentError } from '../entities/errors/illegal-argument-error';

export class Preconditions {
    static checkArgument(expression: boolean, errorMessage?: string): void {
        if (expression) {
            return;
        }
        throw new IllegalArgumentError(errorMessage);
    }
}
