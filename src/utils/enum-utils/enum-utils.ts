interface EnumType<T> {
    [key: string]: T
}

export function keys<T>(enumType: EnumType<T>): T[] {
    const keys = Object.values(enumType);
    return keys.slice(0, keys.length / 2);
}
