export class IllegalArgumentError extends Error {
    constructor(errorMessage?: string) {
        super(errorMessage? `Illegal argument: ${errorMessage}` : 'Illegal argument');
    }
}
