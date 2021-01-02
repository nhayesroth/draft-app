export class Random {
    static CHARACTERS = 'abcdefghijklmnopqrstuvwxyz';

    static string(length: number = 10): string {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Random.CHARACTERS.charAt(Math.floor(Math.random() * Random.CHARACTERS.length));
        }
        return result;
    }
}
